import { Log } from "../models/log.model";

export async function log(message: string, logInConsole = true) {
  const log = { message, timestamp: new Date() };

  await Log.create(log);
  if (process.env.NODE_ENV === "test" || !logInConsole) {
    return;
  }
  console.log(log);
}
