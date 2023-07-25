const inquirer = require('inquirer');
const mysql = require('mysql2');


const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORDMYSQL,
    database: 'USAFinancial_db'
});

const questions = [{
    type: 'list',
    name: 'action',
    message: 'What action would you like to take?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Update an employee role']
}]



function init() {
    inquirer.prompt(questions)
    .then((answer) => {
        console.log(answer);
        switch (answer.action) {
            case 'View all departments':
                console.log('department');
                break;
            case 'View all roles':
                console.log('roles');
                break;
            case 'View all employees':
                console.log('roles');
                break;
            case 'Add a department':
                console.log('roles');
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
        .catch((err) => console.err('Error occurred: ', err))
}

init();