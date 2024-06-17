import express, { Request, Response } from "express";
const router = express.Router();

import { CronRecord } from "../models/cron-record.model";

export const getConRecords = async (req: Request, res: Response) => {
  const cronRecords = await CronRecord.findAll();
  res.status(200).send(cronRecords);
};

export const postConRecord = async (req: Request, res: Response) => {
  const { schedule } = req.body as { schedule: string };

  const cronRecord = new CronRecord({
    schedule,
  }).save();

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
