const pool = require("../utils/pool");

module.exports = class Class {
  id;
  title;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
  }

  // INSERT
  static async create(title) {
    const { rows } = await pool.query(
      `
        INSERT INTO classes (title)
        VALUES ($1)
        RETURNING *
    `,
      [title]
    );

    return new Class(rows[0]);
  }

  // GET
  static async find() {
    const { rows } = await pool.query(`
        SELECT * FROM classes
      `);

    return rows.map((row) => new Class(row));
  }

  // GET BY ID
  static async findByID(id) {
    const { rows } = await pool.query(
      `
      SELECT * FROM classes
      WHERE id=$1
    `,
      [id]
    );

    if (!rows[0]) throw new Error(`No course corresponds with id ${id}`);
    return new Class(rows[0]);
  }

  // UPDATE
  static async update(id, { title }) {
    const { rows } = await pool.query(
      `
      UPDATE classes
      SET title=$1
      WHERE id=$2
      RETURNING *
    `,
      [title, id]
    );

    return new Class(rows[0]);
  }

  // DELETE
};
