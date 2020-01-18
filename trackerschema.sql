DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    salary DECIMAL,
    department_id INT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY(id)
);

INSERT INTO departments(dept_name) VALUES ("Sales");
INSERT INTO departments(dept_name) VALUES ("Marketing");
INSERT INTO departments(dept_name) VALUES ("Finance");
INSERT INTO departments(dept_name) VALUES ("Design");

INSERT INTO roles ( title, salary, department_id)
    VALUES ('Sales Lead', 50000, 1),
    ('Sales Person', 40000, 1),
    ('Lead Marketer', 100000, 2),
    ('Marketing Assistant', 60000, 2),
    ('Accountant', 120000, 3),
    ('Design Director', 10000, 4),
    ('Designer', 80000, 4);

INSERT INTO employees ( first_name, last_name, role_id, manager_id)
    VALUES 
        ('Don', 'Maxx', 3, 1),
        ('Maria','Sharp', 4, 3),
        ('Alex', 'Jung', 1, NULL),
        ('John', 'Doe', 1, 1);
        