DROP DATABASE IF EXISTS USAFinancial_db;
CREATE DATABASE USAFinancial_db;

USE USAFinancial_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

INSERT INTO departments (id, name) 
VALUES 
    ( 1, 'Legal'),
    ( 2, 'Engineering'),
    ( 3, 'Investments');
