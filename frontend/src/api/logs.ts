import { processResponse } from "../utils/process-response";

export type Log = {
  id: number;
  message: string;
  timestamp: string;
};

export async function getLogs() {
  const response = await fetch("/api/logs");
  return processResponse(response) as Promise<Log[]>;
}
