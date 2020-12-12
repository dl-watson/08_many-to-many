const pool = require("../utils/pool");

module.exports = class Class {
  id;
  title;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
  }

  // INSERT
  static async insert(title) {
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

  // GET BY ID

  // UPDATE

  // DELETE
};
