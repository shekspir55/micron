import * as cronjsMatcher from "@datasert/cronjs-matcher";

// I hope that the task was not to implement the whole cron parser from scratch
// I just used a library to get next run time of a cron job
export const getNextRunTime = (schedule: string): Date => {
  const nextRun = cronjsMatcher.getFutureMatches(schedule, {
    matchCount: 1,
    startAt: new Date().toISOString(),
  });

  return new Date(nextRun[0]);
};
