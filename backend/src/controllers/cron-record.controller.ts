import express, { Request, Response } from "express";

import { CronRecord, CronRecordAttributes } from "../models/cron-record.model";

export const getConRecords = async (req: Request, res: Response) => {
  const cronRecords = await CronRecord.findAll();
  res.status(200).send(cronRecords);
};

export const postConRecord = async (req: Request, res: Response) => {
  const { schedule } = req.body as { schedule: string };

  const cronRecord = new CronRecord({
    schedule,
  } as CronRecordAttributes).save();

  res.status(201).send(cronRecord);
};

export const putConRecord = async (req: Request, res: Response) => {
  const { recordId } = req.params as { recordId: string };
  const { schedule } = req.body as { schedule: string };

  const cronRecord = await CronRecord.findByPk(recordId);

  if (!cronRecord) {
    return res.status(404).send({ errorMessage: "Cron record not found" });
  }

  cronRecord.schedule = schedule;

  await cronRecord.save();

  res.status(201).send(cronRecord);
};

export const deleteConRecord = async (req: Request, res: Response) => {
  const { recordId } = req.params as { recordId: string };

  const cronRecord = await CronRecord.findByPk(recordId);

  if (!cronRecord) {
    return res.status(404).send({ errorMessage: "Cron record not found" });
  }

  await cronRecord.destroy();

  res.status(204).send();
};

export const bombardWithConRecord = async (req: Request, res: Response) => {
  const cronRecords = Array.from({ length: 10000 })
    .map(() =>
      Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join(" ")
    )
    .map((schedule) =>
      new CronRecord({ schedule } as CronRecordAttributes).save()
    );

  await Promise.all(cronRecords);
  return getConRecords(req, res);
};
