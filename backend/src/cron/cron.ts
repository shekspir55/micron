import { Op } from "@sequelize/core";

import { CronRecord } from "../models/cron-record.model";
import { processWithWorkers } from "./cron-worker";
import { log } from "../helpers/logger";

const second = 1000;
const tenSeconds = 10 * second;

const maxNumberOfWorkers = Number(process.env.NUMBER_OF_WORKERS) || 100;
const maxNumberOfTasksPerWorker =
  Number(process.env.NUMBER_OF_WORKERS) || 10000;

let isCronRunning = false;
const cron = async () => {
  if (isCronRunning) {
    log("Cron worker is already running, skipping this cycle");
    return;
  }
  isCronRunning = true;

  const startTime = new Date().getTime();
  log(
    `Cron worker is starting to execute cron jobs at ${new Date().toISOString()}`
  );

  const cronRecordsCount = await CronRecord.count({
    where: {
      nextRunTime: {
        [Op.lte]: new Date(),
      },
    },
  });

  const numberOfWorkers = Math.min(
    Math.round(cronRecordsCount / maxNumberOfTasksPerWorker),
    maxNumberOfWorkers
  );
  const numberOfTasksPerWorker = Math.ceil(cronRecordsCount / numberOfWorkers);

  log(`Found ${cronRecordsCount} cron records to execute`);
  log(
    `Spawning ${numberOfWorkers} workers to execute cron jobs with ${numberOfTasksPerWorker} tasks per worker`
  );

  const cronRecordShards = await processWithWorkers(
    numberOfWorkers,
    numberOfTasksPerWorker
  );

  await Promise.all(cronRecordShards);
  const endTime = new Date().getTime();
  const timeTaken = endTime - startTime;
  log(
    `⏳️Cron worker has finished executing ${cronRecordsCount} cron jobs in this cycle in ${
      timeTaken / second
    }s`
  );

  isCronRunning = false;
};

export const startCron = async () => {
  log("Cron service started");
  setInterval(async () => cron(), tenSeconds);
  cron();
  return;
};
