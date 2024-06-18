import { Log } from "../models/log.model";

export async function log(message: string) {
  const log = { message, timestamp: new Date() };

  await Log.create(log);
  if (process.env.NODE_ENV === "test") {
    return;
  }
  console.log(log);
}
