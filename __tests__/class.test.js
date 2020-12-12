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

  it("adds a new class record", async () => {
    const res = await request(app).post({
      title: "Developer 101",
    });

    expect(res.body).toEqual({
      id: "1",
      title: "Developer 101",
    });
  });

  it("gets all class records", async () => {
    const courses = await Promise.all(
      [
        {
          title: "Developer 101",
        },
        {
          title: "Code 201: Fundamentals of Software Development",
        },
        {
          title: "Code 301: Intermediate Software Development",
        },
        {
          title:
            "Code 401: Advanced Software Development in Full Stack JavaScript",
        },
      ].map((course) => new Class(course))
    );

    const res = await request(app).get("/students");

    expect(res.body).toEqual(expect.arrayContaining(courses));
  });

  it("gets a class record by id", async () => {});

  it("updates a class record by id", async () => {});

  it("deletes a class record by id", async () => {});
});
