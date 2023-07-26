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

const questions2 = [{
    type: 'list',
    name: 'secondaryActions',
    message: 'What would you like to do next?',
    choices: ['View Departments', 'Add Another Department', 'Main Menu']
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
                console.log('roles');
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
        inquirer.prompt(questions2)
        .then((answer) => {
            switch (answer.secondaryActions) {
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
        connection.query(`INSERT INTO departments (name) VALUES ('${answer.addNameOfDepartment}')`)})
    .then(() => inquirer.prompt(questions2))
    .then((answer) => {
        switch (answer.secondaryActions) {
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
init();