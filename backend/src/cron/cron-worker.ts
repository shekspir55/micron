import { Worker, isMainThread, parentPort, workerData } from "worker_threads";

import { Op } from "@sequelize/core";
import { initDB } from "../sequalize";

import { CronRecord } from "../models/cron-record.model";

import { getNextRunTime } from "../helpers/chron-util";
import { executeTask } from "../helpers/execute";
import { log } from "../helpers/logger";

const executeCronRecords = async (cronRecords: CronRecord[]) => {
  cronRecords.map(async (cronRecord) => {
    const { id, schedule } = cronRecord;
    executeTask(id, schedule);
    cronRecord.nextRunTime = getNextRunTime(schedule);
    return await cronRecord.save();
  });

  return Promise.all(cronRecords);
};

let processWithWorkers = (
  numberOfWorkers: number,
  numberOfTasksPerWorker: number
) => Promise.resolve([] as any[]);

if (isMainThread) {
  processWithWorkers = (
    numberOfWorkers: number,
    numberOfTasksPerWorker: number
  ) => {
    const workerPromises = Array.from({ length: numberOfWorkers })
      .map((_, index) => {
        const offset = index * numberOfTasksPerWorker;
        const limit = numberOfTasksPerWorker;
        return { offset, limit, workerId: index };
      })
      .map(
        (batch) =>
          new Promise((resolve, reject) => {
            const resolvedPath = require.resolve(__filename);
            const worker = new Worker(__filename, {
              workerData: batch,
              execArgv: /\.ts$/.test(resolvedPath)
                ? ["--require", "ts-node/register"]
                : undefined,
            });
            worker.on("message", resolve);
            worker.on("error", reject);
            worker.on("exit", (code: number) => {
              if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
            });
          })
      );

    return Promise.all(workerPromises);
  };
} else {
  (async () => {
    try {
      await initDB();
      const { offset, limit, workerId } = workerData;
      
      const cronRecordBatch = await CronRecord.findAll({
        order: [["id", "DESC"]],
        where: {
          nextRunTime: {
            [Op.lte]: new Date(),
          },
        },
        offset,
        limit,
      });

      await executeCronRecords(cronRecordBatch);
      log(
        `Worker ${workerId} processed ${cronRecordBatch.length} cron records`
      );
      parentPort?.postMessage("processed");
    } catch (error) {
      parentPort?.postMessage(error);
    }
  })();
}

export { processWithWorkers };
