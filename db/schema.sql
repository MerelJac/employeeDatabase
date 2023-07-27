DROP DATABASE IF EXISTS USAFinancial_db;
CREATE DATABASE USAFinancial_db;

USE USAFinancial_db;

-- departments
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

INSERT INTO departments (id, name) 
VALUES 
    ( 1, 'Legal'),
    ( 2, 'Engineering'),
    ( 3, 'Investments');

-- roles 
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(id)
);

INSERT INTO roles (id, name, dept_id) 
VALUES 
    (1, 'Cheif of Engineering', 2),
    (2, 'Cheif of Legal', 1);

