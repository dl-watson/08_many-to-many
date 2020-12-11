const pool = require("../utils/pool");

module.exports = class Student {
  id;
  name;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
  }

  // INSERT
  static async create({ name }) {
    const { rows } = await pool.query(
      `
    INSERT INTO students (name) 
    VALUES ($1) 
    RETURNING *
    `,
      [name]
    );

    return new Student(rows[0]);
  }

  // GET

  // GET BY ID

  // UPDATE

  // DELETE
};
