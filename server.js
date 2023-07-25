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
        console.log(answer)


    })
}

init();