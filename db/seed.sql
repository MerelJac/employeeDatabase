INSERT INTO departments (name) 
VALUES 
    ('Legal'),
    ('Engineering'),
    ('Investments');

INSERT INTO roles (name, salary, department, dept_id) 
VALUES 
    ('Cheif of Engineering', '200000', 'Engineering', 2),
    ('Cheif of Legal', '250000', 'Legal', 1);

INSERT INTO employee (first_name, last_name, role_name, role_id, department, dept_id)
VALUES 
    ('Merel', 'Jacobs', 'Cheif of Engineering', 1, 'Engineering', 2),
    ('Hope', 'Flores', 'Cheif of Legal', 2, 'Legal', 1);