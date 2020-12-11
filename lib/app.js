const express = require("express");
const app = express();

app.use(express.json());

const Student = require("./models/Student");

app.get("/", (req, res, next) => {
  res.send({ hello: "world" });
});

app.post("/students", (req, res, next) => {
  res.send({ id: 1, name: "Dee" });
});

module.exports = app;
