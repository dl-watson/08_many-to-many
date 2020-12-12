const fs = require("fs");
const pool = require("../lib/utils/pool");
const request = require("supertest");
const app = require("../lib/app");

const Student = require("../lib/models/Student");
const Class = require("../lib/models/Class");

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

  it("adds a new student record", async () => {
    const res = await request(app).post("/students").send({
      name: "Dee",
    });

    expect(res.body).toEqual({
      id: "1",
      name: "Dee",
    });
  });

  it("gets all student records", async () => {
    const students = await Promise.all(
      [
        {
          name: "Dee",
        },
        {
          name: "Richard",
        },
        {
          name: "Jena",
        },
      ].map((student) => Student.create(student))
    );

    const res = await request(app).get("/students");

    expect(res.body).toEqual(expect.arrayContaining(students));
  });

  it("gets a student record by id", async () => {
    const student = await Student.create({
      name: "Dee",
    });

    const res = await request(app).get(`/students/${student.id}`);

    expect(res.body).toEqual(student);
  });

  it("updates a student record by id", async () => {
    const oldStudent = await Student.create({
      name: "Dee",
    });

    const newStudent = await Student.update(oldStudent.id, {
      name: "Deeeeeeeeeeeeeeeeeeeeeee",
    });

    const res = await request.get(`/students/${oldStudent.id}`);

    expect(res.body).toEqual(newStudent);
  });

  it("deletes a student record by id", async () => {});
});
