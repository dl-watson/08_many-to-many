const fs = require("fs");
const pool = require("../lib/utils/pool");
const request = require("supertest");
const app = require("../lib/app");

describe("08_many-to-many routes", () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync("./sql/setup.sql", "utf-8"));
  });

  afterAll(() => {
    return pool.end();
  });

  it("tests express route", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual({ hello: "world" });
  });

  it("adds a new class record", async () => {});

  it("gets all class records", async () => {});

  it("gets a class record by id", async () => {});

  it("updates a class record by id", async () => {});

  it("deletes a class record by id", async () => {});
});
