import request from "supertest";

import routes from "../src/app";

describe("Test app.ts", () => {
  test("Catch-all route", async () => {
    const res = await request(routes).get("/");
    expect(res.body).toEqual({ message: "Hello world" });
  });
  
  test("GET /api/cron-records", async () => {
    const findAll = jest.fn().mockResolvedValue([]);
    jest.mock("../src/models/cron-record.model", () => ({
      CronRecord: {
        findAll,
      },
    }));

    const res = await request(routes).get("/api/cron-records");
    
    console.log(res)
    
    expect(res.body).toEqual([]);
  });

});


