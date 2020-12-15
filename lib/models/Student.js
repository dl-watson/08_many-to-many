const pool = require("../utils/pool");

module.exports = class Student {
  id;
  name;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
  }

  // INSERT
  static async create(name, enrolled) {
    const { rows } = await pool.query(
      `
    INSERT INTO students (name) 
    VALUES ($1) 
    RETURNING *
    `,
      [name]
    );

    await pool.query(
      `
    INSERT INTO enrollments (student_id, class_id)
    SELECT ${rows[0].id}, id FROM classes WHERE title=ANY($1::text[])
    `,
      [enrolled]
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
      SELECT  
        students.*,
        array_to_json(array_agg(classes.title)) AS enrolled
      FROM 
        enrollments
      JOIN students
      ON enrollments.student_id = students.id
      JOIN classes
      ON enrollments.class_id = classes.id
      WHERE students.id=$1
      GROUP BY students.id
    `,
      [id]
    );

    if (!rows[0]) throw new Error(`No student corresponds with id ${id}`);

    return {
      ...new Student(rows[0]),
      enrolled: rows[0].enrolled,
    };
  }

  // UPDATE
  static async update(id, name) {
    const { rows } = await pool.query(
      `
      UPDATE students
      SET name=$1
      WHERE id=$2
      RETURNING *
    `,
      [name, id]
    );

    return new Student(rows[0]);
  }

  // DELETE
  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM students
      WHERE id=$1
      RETURNING *
    `,
      [id]
    );

    return new Student(rows[0]);
  }
};
