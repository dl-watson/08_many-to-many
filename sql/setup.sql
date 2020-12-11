DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS classes CASCADE;
DROP TABLE IF EXISTS enrollments;

CREATE TABLE students (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(256) NOT NULL
);

CREATE TABLE classes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(256) NOT NULL
);

CREATE TABLE enrollments (
    student_id BIGINT REFERENCES students(id)
    class_id BIGINT REFERENCES classes(id)
    enrollment_id PRIMARY KEY (student_id, class_id)
);