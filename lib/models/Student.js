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
  static async find() {
    const { rows } = await pool.query(`
      SELECT * FROM students
    `);

    return rows.map((row) => new Student(row));
  }

  // GET BY ID
  static async findByID(id) {
    const { rows } = await pool.query(
      `
      SELECT * FROM students
      WHERE id=$1
    `,
      [id]
    );

    if (!rows[0]) throw new Error(`No student corresponds with id ${id}`);
    return new Student(rows[0]);
  }

  // UPDATE

  // DELETE
};
