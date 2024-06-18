import { log } from "./logger";

export const executeTask = async (cronId: number, cronSchedule: string) => {
  log(
    "Executing cron job with id: " + cronId + " and schedule: " + cronSchedule,
    false
  );
};
