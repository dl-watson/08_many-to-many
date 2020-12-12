const express = require("express");
const app = express();

app.use(express.json());

const Student = require("./models/Student");
const Class = require("./models/Class");

app.get("/", (req, res, next) => {
  res.send({ hello: "world" });
});

// STUDENT ROUTES

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

app.delete("/students/:id", (req, res, next) => {
  return Student.delete(req.params.id)
    .then((data) => res.send(data))
    .catch(next);
});

// CLASS ROUTES

app.post("/classes", (req, res, next) => {
  return Class.create(req.body.title)
    .then((data) => res.send(data))
    .catch(next);
});

app.get("/classes", (req, res, next) => {
  return Class.find()
    .then((data) => res.send(data))
    .catch(next);
});

module.exports = app;
