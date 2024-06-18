import { Request, Response } from "express";

import { Log } from "../models/log.model";

export const getLogs = async (req: Request, res: Response) => {
  const logs = await Log.findAll({
    order: [["id", "DESC"]],
    limit: 10000,
  });

  res.status(200).send(logs);
};
