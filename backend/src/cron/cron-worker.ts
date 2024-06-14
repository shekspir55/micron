const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("node:worker_threads");

import { CronRecord } from "../models/cron-record.model";
import { executeTask } from "../helpers/execute";
import { log } from "../helpers/logger";
import { getNextRunTime } from "../helpers/chron-util";

const minute = 60 * 1000;
const numberOfWorkers = Number(process.env.NUMBER_OF_WORKERS) || 1;

const splitIntoChunks = (arr: any[], chunkSize: number) => {
  const chunks = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }

  return chunks;
};

export const sartCron = async () => {
  log("Cron process started");

  setInterval(async () => {
    log("Cron worker is starting to execute cron jobs");

    const cronRecords = await CronRecord.findAll({
      where: {
        nextRunTime: {
          lte: new Date(),
        },
      },
    });

    const cronRecordShards = splitIntoChunks(
      cronRecords,
      cronRecords.length / numberOfWorkers
    );

    await cronRecordShards.map(async (cronRecordBatch) =>
      executeCronRecords(cronRecordBatch)
    );

    await Promise.all(cronRecordShards);

    log("Cron worker has finished executing cron jobs");
  }, minute);

  const executeCronRecords = async (cronRecords: CronRecord[]) => {
    cronRecords.map(async (cronRecord) => {
      const { id, schedule } = cronRecord;
      executeTask(id, schedule);
      cronRecord.nextRunTime = getNextRunTime(schedule);
      return await cronRecord.save();
    });

    return Promise.all(cronRecords);
  };

  return;
};
