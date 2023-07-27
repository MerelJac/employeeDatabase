const inquirer = require('inquirer');
const mysql = require('mysql2');
// no variable necessary
require('dotenv').config();



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORDMYSQL,
    database: 'USAFinancial_db',
    socketPath: '/tmp/mysql.sock'
});

const questions = [{
    type: 'list',
    name: 'action',
    message: 'What action would you like to take?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Update an employee role']
}]

const departmentQuestions = [{
    type: 'list',
    name: 'postDepartmentAnswers',
    message: 'What would you like to do next?',
    choices: ['View Departments', 'Add Another Department', 'Main Menu']
}]

const roleQuestions = [{
    type: 'list',
    name: 'postRoleActions',
    message: 'What would you like to do next?',
    choices: ['View All Roles', 'Add A Role', 'Main Menu']
}];

const employeeQuestions = [{
    type: 'list',
    name: 'postEmployeeActions',
    message: 'What would you like to do next?',
    choices: ['Edit Employee Status', 'Main Menu']
}];

const updateEmployeeQuestions = [{
    type: 'list',
    name: 'updateEmployeeActions',
    message: 'How would you like to update the employee?',
    choices: ['Edit Role', 'Delete Employee', 'Main Menu']
}]
// combination function
function init() {
    inquirer.prompt(questions)
    .then((answer) => {
        switch (answer.action) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            default:
                console.log('Invalid choice');
                break;
        }})
        .catch((err) => console.error('Error occurred: ', err))
}

//each function 
function viewAllDepartments() {
    connection.query(`SELECT * FROM departments`, (err, res) => {
        if (err) throw err;
        console.log('Viewing all Departments:');
        console.table(res);
        inquirer.prompt(departmentQuestions)
        .then((answer) => {
            switch (answer.postDepartmentAnswers) {
                case 'View Departments':
                    viewAllDepartments();
                    break;
                case 'Add Another Department':
                    addDepartment();
                    break;
                case 'Main Menu':
                    init();
                    break;
            }
        })

    });
}

function addDepartment() {
    inquirer.prompt([{
        type: 'input',
        name: 'addNameOfDepartment',
        message: 'What is the new department called?'
    }])
    .then((answer) => {
        connection.query(`INSERT INTO departments (name) VALUES ('${answer.addNameOfDepartment}');`)})
    .then(() => inquirer.prompt(departmentQuestions))
    .then((answer) => {
        switch (answer.postDepartmentAnswers) {
            case 'View Departments':
                viewAllDepartments();
                break;
            case 'Add Another Department':
                addDepartment();
                break;
            case 'Main Menu':
                init();
                break;
        }
    });

}

function viewAllRoles() {
    connection.query(`SELECT * FROM roles;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        inquirer.prompt(roleQuestions)
        .then((answer) => {
            switch (answer.postRoleActions) {
                case 'Add A Role':
                    addRole();
                    break;
                case 'Delete Employee':
                    deleteEmployee();
                    break;
                case 'Main Menu':
                    init();
                    break;
            }
        });

    })
}

function addRole() {
    inquirer.prompt([{
        type: 'input',
        name: 'addNameOfRole',
        message: 'What is the new role called?'
    }, {
        type: 'list',
        name: 'deptID',
        message: 'What department does this role work in?',
        choices: ['Cutomer Service', 'Financial', 'Legal']
    }])
    .then((answer) => {
        connection.query(`INSERT INTO roles (name, department) VALUES ('${answer.addNameOfRole}', '${answer.deptID}');`, (err, res) => {
            if (err) throw err;
            console.table(res);
        })})
    .then(() => inquirer.prompt(roleQuestions))
    .then((answer) => {
        switch (answer.postRoleActions) {
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Another Role':
                addRole();
                break;
            case 'Main Menu':
                init();
                break;
        }
    });
}

// employees

function viewAllEmployees() {   
    connection.query(`SELECT * FROM employee`, (err, res) => {
        if (err) throw err;
        console.table(res);
        inquirer.prompt(employeeQuestions)
        .then((answer) => {
        switch (answer.postEmployeeActions) {
            case 'Edit Employee Status':
                updateEmployeeRole();
                break;
            case 'Main Menu':
                init();
                break;
        }
    })
    });
}

function updateEmployeeRole() {
    inquirer.prompt(updateEmployeeQuestions)
    .then((answers) => {
        switch (answers.updateEmployeeActions) {
            case 'Edit Role':
            inquirer.prompt([{
                type: 'input',
                name: 'who',
                message: 'Enter the employee ID you would like to edit: '
            }, {
                type: 'input',
                name: 'newRole',
                message: 'What is their new role?'
            }]).then((answer) => {
                connection.query(
                    `UPDATE employee SET role_name = '${answer.newRole}' WHERE id = '${answer.who}';`, (err, res) => {
                    if (err) {throw err};
                    connection.query(`SELECT * FROM employee WHERE id = '${answer.who}';`, (err, selectRes) => {
                        if (err) throw err;
                        console.table(selectRes);
                        init();
                    });
                });
            })
                break;
            case 'Delete Employee':
                deleteEmployee();
                break;
            case 'Main Menu':
                init();
                break;
        }
    })

}

function deleteEmployee() {
    inquirer.prompt([{
        type: 'input',
        name: 'who',
        message: 'Enter the employee ID you would like to delete: '
}]).then((answers) => {
    connection.query(`DELETE FROM employee WHERE id = '${answers.who}';`, (err, res) => {
        if (err) {
            console.log(err);
            console.log(`Employee ID not found. Please try again.`);
            // reprompt for new employee id
            deleteEmployee();
        } else {
        console.log(`Employee removed`)
        init();}
    })
})}

// auto runs function on launch
init();