import { Request, Response } from "express";

import { CronRecord, CronRecordAttributes } from "../models/cron-record.model";

export const getCronRecords = async (req: Request, res: Response) => {
  const cronRecords = await CronRecord.findAll({
    order: [["id", "DESC"]],
    limit: 20000,
  });

  res.status(200).send(cronRecords);
};

export const postCronRecord = async (req: Request, res: Response) => {
  const { schedule, isOneTime, nextRunTime } = req.body as Omit<
    CronRecordAttributes,
    "id"
  >;

  if (!schedule && !(isOneTime && nextRunTime)) {
    return res.status(400).send({ errorMessage: "Schedule is required" });
  }

  if (isOneTime && typeof isOneTime !== "boolean") {
    return res
      .status(400)
      .send({ errorMessage: "isOneTime must be a boolean" });
  }

  const cronRecord = CronRecord.build({
    schedule,
    isOneTime,
    nextRunTime,
  });

  await cronRecord.save();

  res.status(201).send(cronRecord);
};

export const putCronRecord = async (req: Request, res: Response) => {
  const { recordId } = req.params as { recordId: string };
  const { schedule } = req.body as { schedule: string };

  if (!schedule) {
    return res.status(400).send({ errorMessage: "Schedule is required" });
  }

  const cronRecord = await CronRecord.findByPk(recordId);

  if (!cronRecord) {
    return res.status(404).send({ errorMessage: "Cron record not found" });
  }

  cronRecord.schedule = schedule;

  await cronRecord.save();

  res.status(201).send(cronRecord);
};

export const deleteCronRecord = async (req: Request, res: Response) => {
  const { recordId } = req.params as { recordId: string };

  const cronRecord = await CronRecord.findByPk(recordId);

  if (!cronRecord) {
    return res.status(404).send({ errorMessage: "Cron record not found" });
  }

  await cronRecord.destroy();

  res.status(204).send({ message: "Cron record deleted" });
};

export const bombardWithCronRecord = async (req: Request, res: Response) => {
  const cronRecords = Array.from({ length: 10000 })
    .map(
      () => `*/${1 + Math.round(Math.random())} * * * *`
      // to simplify, we are generating a random schedule from 1 to 2 minutes so we can test it quickly
    )
    .map((schedule) =>
      CronRecord.build({ schedule } as CronRecordAttributes).save()
    );

  await Promise.all(cronRecords);
  return getCronRecords(req, res);
};
