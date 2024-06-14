import express, { Express } from "express";
import dotenv from "dotenv";

import { initDB } from "./src/sequalize";
import { sartCron } from "./src/cron/cron-worker";

import "./src/routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

(async () => {
  await initDB();
  sartCron();
})();
