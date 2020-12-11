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

  it("adds a new student record", async () => {});

  it("gets all student records", async () => {});

  it("gets a student record by id", async () => {});

  it("updates a student record by id", async () => {});

  it("deletes a student record by id", async () => {});
});
