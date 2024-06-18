import { processResponse } from "../utils/process-response";

export type Log = {
  id: number;
  message: string;
  timestamp: string;
};

export async function getLogs() {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/logs`);
  return processResponse(response) as Promise<Log[]>;
}
