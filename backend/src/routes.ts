import express, { Request, Response } from "express";

import { CronRecord } from "./models/cron-record.model";
import { getNextRunTime } from "./helpers/chron-util";
import { log } from "./helpers/logger";

const router = express.Router();

router.get("/api/cron-records", async (req: Request, res: Response) => {
  const cronRecords = await CronRecord.findAll();
  res.status(200).send(cronRecords);
});

router.post("/api/cron-records", async (req: Request, res: Response) => {
  const { schedule } = req.body as { schedule: string };

  const nextRunTime = getNextRunTime(schedule);
  const cronRecord = await CronRecord.create({
    schedule,
    nextRunTime,
  });

  log(
    "Cron job created with id: " + cronRecord.id + " and schedule: " + schedule
  );

  res.status(201).send(cronRecord);
});
