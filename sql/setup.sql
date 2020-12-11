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
    student_id BIGINT REFERENCES students(id),
    class_id BIGINT REFERENCES classes(id),
    PRIMARY KEY (student_id, class_id)
);


-- pgADMIN QUERIES
-- INSERT INTO students (name) VALUES ('Dee');
-- INSERT INTO students (name) VALUES ('Richard'); 
-- INSERT INTO students (name) VALUES ('Jena');
-- SELECT * FROM students;

-- INSERT INTO classes (title) VALUES ('DEV 101');
-- INSERT INTO classes (title) VALUES ('FOUNDATIONS I'); 
-- INSERT INTO classes (title) VALUES ('FOUNDATIONS II');
-- SELECT * FROM classes;

-- INSERT INTO enrollments (student_id, class_id) VALUES (1, 1), (1, 2)

-- SELECT  
-- 	students.name,
-- 	array_agg(classes.title)
-- FROM 
-- 	enrollments
-- JOIN students
-- ON enrollments.student_id = students.id
-- JOIN classes
-- ON enrollments.class_id = classes.id
-- GROUP BY students.name