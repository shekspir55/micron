import { Log } from "../models/log.model";

export async function log(message: string) {
  const log = { message, timestamp: new Date() };
  console.log(log);
  await Log.create(log);
  return;
}
