import request from "supertest";

import routes from "../src/app";

describe("Test routes.ts", () => {
  test("Catch-all route", async () => {
    const res = await request(routes).get("/");
    expect(res.body).toEqual({ message: "Hello world" });
  });
  
});


