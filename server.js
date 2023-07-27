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
                console.log('roles');
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                console.log('roles');
                break;
            case 'Update an employee role':
                console.log('roles');
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
        choices: ['1', '2', '3']
    }])
    .then((answer) => {
        connection.query(`INSERT INTO roles (name, dept_id) VALUES ('${answer.addNameOfRole}', '${answer.deptID}');`, (err, res) => {
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

// auto runs function on launch
init();