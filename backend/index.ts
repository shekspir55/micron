import dotenv from "dotenv";

import { initDB } from "./src/sequalize";
import { sartCron } from "./src/cron/cron-worker";

import app from "./src/app";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

(async () => {
  await initDB();
  sartCron();
})();
