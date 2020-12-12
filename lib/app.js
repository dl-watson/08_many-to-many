const express = require("express");
const app = express();

app.use(express.json());

const Student = require("./models/Student");

app.get("/", (req, res, next) => {
  res.send({ hello: "world" });
});

app.post("/students", (req, res, next) => {
  return Student.create({ name: req.body.name })
    .then((data) => res.send(data))
    .catch(next);
});

app.get("/students", (req, res, next) => {
  return Student.find()
    .then((data) => res.send(data))
    .catch(next);
});

app.get("/students/:id", (req, res, next) => {
  return Student.findByID(req.params.id)
    .then((data) => res.send(data))
    .catch(next);
});

app.put("/students/:id", (req, res, next) => {
  return Student.update(req.params.id, req.body.name)
    .then((data) => res.send(data))
    .catch(next);
});

module.exports = app;
