import request from "supertest";
import routes from "../src/app";
import { initDB } from "../src/sequalize";
import { CronRecord } from "../src/models/cron-record.model";
import { Log } from "../src/models/log.model";

describe("Test app.ts", () => {
  beforeAll(async () => {
    await initDB();
    return;
  });

  beforeEach(async () => {
    await CronRecord.truncate();
    await Log.truncate();
    return;
  });

  test("Test route", async () => {
    const res = await request(routes).get("/");
    expect(res.body).toEqual({ message: "Hello world" });
  });

  test("GET /api/cron-records to return empty array", async () => {
    const res = await request(routes).get("/api/cron-records");
    expect(res.body).toEqual([]);
  });

  test("POST /api/cron-records to return 400", async () => {
    const res = await request(routes).post("/api/cron-records");
    expect(res.status).toEqual(400);
  });

  test("POST /api/cron-records to return 201 with schedule", async () => {
    const schedule = "*/4 * * * *";

    const logs = await Log.findAll();
    expect(logs.length).toEqual(0);

    const res = await request(routes)
      .post("/api/cron-records")
      .send({ schedule });

    expect(res.status).toEqual(201);
    expect(res.body.schedule).toEqual(schedule);
    expect(res.body.id).toBeDefined();
    expect(new Date(res.body.nextRunTime).getTime()).not.toBeNaN();

    const logsAfter = await Log.findAll();
    expect(logsAfter.length).toEqual(1);
  });

  test("POST /api/cron-records to return 201 with isOneTime", async () => {
    const logs = await Log.findAll();
    expect(logs.length).toEqual(0);

    const res = await request(routes)
      .post("/api/cron-records")
      .send({ isOneTime: true, nextRunTime: new Date().toISOString() });
    
    expect(res.status).toEqual(201);
    expect(res.body.isOneTime).toEqual(true);
    expect(res.body.id).toBeDefined();
    expect(new Date(res.body.nextRunTime).getTime()).not.toBeNaN();

    const logsAfter = await Log.findAll();
    expect(logsAfter.length).toEqual(1);
  });

  test("PUT /api/cron-records/:id to return 404", async () => {
    const res = await request(routes).put("/api/cron-records/1");
    expect(res.status).toEqual(400);

    const resWithSchedule = await request(routes)
      .put("/api/cron-records/1")
      .send({
        schedule: "*/5 * * * *",
      });
    expect(resWithSchedule.status).toEqual(404);
  });

  test("PUT /api/cron-records/:id to return 400", async () => {
    const res = await request(routes).put("/api/cron-records/1");
    expect(res.status).toEqual(400);
  });

  test("PUT /api/cron-records/:id to return 200", async () => {
    const schedule = "*/5 * * * *";
    // first create a record
    const resCreate = await request(routes)
      .post("/api/cron-records")
      .send({ schedule: "*/4 * * * *" });

    expect(resCreate.status).toEqual(201);
    expect(resCreate.body.id).toBeDefined();

    const res = await request(routes)
      .put(`/api/cron-records/${resCreate.body.id}`)
      .send({ schedule });

    expect(res.status).toEqual(201);
    expect(res.body.schedule).toEqual(schedule);
    expect(res.body.id).toBeDefined();
    expect(new Date(res.body.nextRunTime).getTime()).not.toBeNaN();
  });

  test("DELETE /api/cron-records/:id to return 404", async () => {
    const res = await request(routes).delete("/api/cron-records/1");
    expect(res.status).toEqual(404);
  });

  test("DELETE /api/cron-records/:id to return 204", async () => {
    const resCreate = await request(routes)
      .post("/api/cron-records")
      .send({ schedule: "*/4 * * * *" });

    expect(resCreate.status).toEqual(201);
    const res = await request(routes).delete(
      `/api/cron-records/${resCreate.body.id}`
    );
    expect(res.status).toEqual(204);
  });

  test("GET /api/logs to return empty array", async () => {
    const res = await request(routes).get("/api/logs");
    expect(res.body).toEqual([]);
  });

  test("POST /api/cron-records/bombard to return 200 and return at least 10000 CronRecords", async () => {
    const res = await request(routes).post("/api/cron-records/bombard");

    expect(res.body.length).toBeGreaterThanOrEqual(10000);

    res.body.forEach((record: any) => {
      expect(record.id).toBeDefined();
      expect(record.schedule).toBeDefined();
      expect(new Date(record.nextRunTime).getTime()).not.toBeNaN();
    });

    const logs = await Log.findAll();
    expect(logs.length).toBeGreaterThanOrEqual(10000);

    const logsRes = await request(routes).get("/api/logs");
    expect(logsRes.body.length).toBeGreaterThanOrEqual(1000);

    expect(res.status).toEqual(200);
  }, 60000);
});
