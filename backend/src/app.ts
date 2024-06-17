import express, { Application } from "express";

import {
  deleteConRecord,
  getConRecords,
  postConRecord,
  putConRecord,
} from "./controllers/cron-record.controller";
import { getLogs } from "./controllers/log.controller";

const app: Application = express();

// test route
app.get("/", (req, res) => res.json({ message: "Hello world" }));

// logs
app.get("/api/logs", getLogs);

// cron-records
app.get("/api/cron-records", getConRecords);
app.post("/api/cron-records", postConRecord);
app.put("/api/cron-records/:recordId", putConRecord);
app.delete("/api/cron-records/:recordId", deleteConRecord);

export default app;
