DROP DATABASE IF EXISTS USAFinancial_db;
CREATE DATABASE USAFinancial_db;

USE USAFinancial_db;

-- departments
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- roles 
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department VARCHAR(30),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(id)
);

-- employee
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_name VARCHAR(60),
    role_id INT,
    department VARCHAR(30),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);


