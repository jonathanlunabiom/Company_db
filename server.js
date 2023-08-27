const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());




function mainMenu(){
    inquirer.prompt(
        [
            {
                type: 'list',
                name: 'toDo',
                message:'What would you like to do?',
                choices: 
                [
                'View Employees','Add Employee','Edit Employee','View Roles',
                'Add Role','View Departments','Add Department','Quit'
                ],
                default: 'View Employees'
            },
        ]
    )
    .then((a)=>{
        console.log(a.toDo)
        let selected;
        switch(a.toDo){
            case 'View Employees':
                view('employee');
                break;
            case 'Add Employee':
                addEmp();
                break;
            case 'Edit Employee':
                addDep();
                break;
            case 'View Roles':
                view('roles');
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View Departments':
                view('department');
                break;
            case 'Add Department':
                addDep();
                break;
            case 'Quit':
                process.exit(0);
        }
    })
    .catch(error=>console.log(error.message))

}

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '1212',
        database: 'company_db'
    },
);

function view(data){
    console.log(data)
    db.query(`SELECT * FROM ? ;`, data ,(err, rows) => {
      if (err) {
        console.error(`Error`);
         return;
    }
    console.table(rows)
    mainMenu();
    });
}


function addDep(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'nametoAdd',
            message: 'Enter a name',
        },
    ])
    .then((a)=>{
        const sql = `INSERT INTO department (name) VALUES (?)`;
        db.query(sql, a.nametoAdd ,(err, rows) => {
            if (err) {
              console.error(`Error`);
               return;
            }
          mainMenu();
          });
    })

}
mainMenu();