const mysql = require('mysql2');
const inquirer = require('inquirer');


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
        // const state = a.toDo.split(' ')[2];
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
                addDep();
                break;
            case 'add a role':
                addRole();
                break;
            case 'add an employee':
                addEmp();
                break;
            case 'update an employee role':
                updateInfo();
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
        password: '',
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
        const values = [a.title,a.salary,a.department]
        const query = `INSERT INTO roles (title,salary,department_id) VALUES (?,?,?)`
        toAdd(query,values);
    })
    .catch(err=>console.error(err.message))
}

function addDep(){
    inquirer.prompt({
        type: 'input',
        name: 'department',
        message: 'Enter department name',
    })
    .then((a)=>{
        const query = `INSERT INTO department (name) VALUES (?)`;
        toAdd(query,a.department)
    })
    .catch(err=>console.error(err.message));
}

function addEmp(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: `Enter employee's first name`
        },
        {
            type: 'input',
            name: 'last_name',
            message: `Enter employee's last name`
        },
        {
            type: 'input',
            name: 'roleID',
            message: `Enter employee's role iD`
        },
        {
            type: 'input',
            name: 'managerID',
            message: `Enter employee's manager ID`,
        },
    ])
    .then((a)=>{
        const values = [a.first_name,a.last_name,a.roleID,a.managerID];
        const query = `INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)`;
        toAdd(query,values);
    })
    .catch(err=>console.error(err.message));
}


function toAdd(statement,values){
    db.query(statement,values,err=>{
        if (err){
            console.error(err.message)
            return;
        }
        console.info('Success')
        mainMenu();
    })
}

function updateInfo(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'empID',
            message: `Enter employee's ID`
        },
        {
            type: 'input',
            name: 'newRole',
            message: `Enter employee's new role ID`
        },
    ])
    .then((a)=>{
        db.query(`UPDATE employee SET role_id = ? WHERE id = ?`,[a.newRole,a.empID])
        mainMenu();
    })
}

mainMenu();