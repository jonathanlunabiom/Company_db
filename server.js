const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const uuid = require('./uuid');

const some = uuid();
console.log(some)


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function mainMenu(){
    inquirer.prompt(
        [
            {
                type: 'list',
                name: 'toDo',
                message:'What would you like to do?',
                choices: 
                [
                'view all departments','view all roles','view all employees','add a department',
                'add a role','add an employee','update an employee role','Quit'
                ],
                default: 'View Employees'
            },
        ]
    )
    .then((a)=>{
        const state = a.toDo.split(' ')[2];
        switch(a.toDo){
            case 'view all employees':
                view('employee');
                break;
            case 'view all roles':
                view('roles');
                break;
            case 'view all departments':
                view('department');
                break;
            case 'add a department':
                add(state);
                break;
            case 'add a role':
                addRole();
                break;
            case 'add an employee':
                add(state);
                break;
            case 'update an employee role':
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
        password: '2002',
        database: 'company_db'
    },
);

function view(data){
    const querie = `SELECT * FROM ${data}`;
    db.query(querie,(err, rows) => {
        
    if (err) {
        console.error(`Error`);
         return;
    }
    console.table(rows)
    mainMenu();
    });
}


function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'set role',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'set salary',
        },
        {
            type: 'input',
            name: 'department',
            message: 'set department id',
        },
    ])
    .then((a)=>{
        const salary = parseFloat(a.salary);
        const dep = parseInt(a.department)
        console.log()
        db.query(`INSERT INTO roles (title,salary,department_id) VALUES (?,?,?)`,a.title,salary,dep,err=> 
        err ? console.error(err.message):console.info('Success'))
    })
    .catch(err=>console.error(err.message))
}




// function addQuery(sql,nametoAdd){
//     db.query(sql, nametoAdd ,(err) => {
//         if (err) {
//           console.error(err);
//            return;
//         }
//         console.info('Added successfully');
//       mainMenu();
//     });
// }

// function add(data){
//     inquirer.prompt([
//         {
//             type: 'input',
//             name: 'nametoAdd',
//             message: `Enter the name of the ${data}`,
//         },
//     ])
//     .then((a)=>{
//         let sql;
//         if(data === 'department'){
//             sql = `INSERT INTO department (name) VALUES (?)`;
//         }else if(data === 'role'){
//             sql = `INSERT INTO roles (title) VALUES (?)`;
//         }else{
//             sql = `INSERT INTO employee (first_name) VALUES (?)`;
//         }
//         addQuery(sql,a.nametoAdd);
//     })
//     .catch((err)=>console.error(err.message))
// }


mainMenu();