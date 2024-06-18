import { processResponse } from "../utils/process-response";

export type CronRecord = {
  id: number;
  schedule: string;
  nextRunTime: string;
  isOneTime: boolean;
};

export async function getCronRecords(): Promise<CronRecord[]> {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/cron-records`
  );
  return processResponse(response) as Promise<CronRecord[]>;
}

export async function createCronRecord({
  schedule,
  nextRunTime,
  isOneTime,
}: Omit<CronRecord, "id">): Promise<CronRecord> {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/cron-records`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ schedule, nextRunTime, isOneTime}),
    }
  );

  return processResponse(response) as Promise<CronRecord>;
}

export async function updateCronRecord(
  recordId: number,
  schedule: string
): Promise<CronRecord> {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/cron-records/${recordId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ schedule }),
    }
  );
  return processResponse(response) as Promise<CronRecord>;
}

export async function deleteCronRecord(recordId: number): Promise<CronRecord> {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/cron-records/${recordId}`,
    {
      method: "DELETE",
    }
  );

  return processResponse(response) as Promise<CronRecord>;
}

export async function bombardCronRecord(): Promise<CronRecord[]> {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/cron-records/bombard`,
    {
      method: "POST",
    }
  );

  return processResponse(response) as Promise<CronRecord[]>;
}
