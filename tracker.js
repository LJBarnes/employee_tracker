// dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");
// var other file = functions etc ?
var dept = [];
var managers = [];
var roleIds = [];

// create the connection information for sql database
var connection = mysql.createConnection({
    host: "localhost",

    // port
    port: 3306,
    // username
    user: "root",
    // your password
    password: "yourRootPassword",
    database: "employees_db"
});

// connect to mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connection made");
    // run the start function after connection to prompt user
    start();
    // connection.end();
    // console.log("connection ended.");
});

// function for first prompt/asks user what action they want to take
function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add Department", "Add Roles", "Add Employee", "View Departments", "View Roles", "View Employees", "Update Employee Role", "Exit"]
        })
        .then(function (answer) {
            // based on answer, run appropriate function
            if (answer.action === "Add Department") {
                addDepartment();
            }
            else if (answer.action === "Add Roles") {
                addRoles();
            }
            else if (answer.action === "Add Employee") {
                addEmployee();
            }
            else if (answer.action === "View Department") {
                viewDepartment();
            }
            else if (answer.action === "View Roles") {
                viewRoles();
            }
            else if (answer.action === "View Employees") {
                viewEmployees();
            }
            else if (answer.action === "Update EmployeeRole") {
                updateRole();
            }
            else {
                connection.end();
            }
        });
}

// function to handle adding a new department
function addDepartment() {
    inquirer
        .prompt([
            {
                name: "addingdept",
                type: "input",
                message: "What is the name of the department you would like to add?"
            }

        ])
        .then(function (answer) {
            // when finished prompting, insert new department into db
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.addingdept
                },
                function (err) {
                    if (err) throw err;
                    console.log("New department added successfully!");
                    // re-prompt if they would like to do something else
                    start();
                }
            );
        });
}
// function for generating departments list
function deptList() {
    connection.query("SELECT id, dept_name FROM departments", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            dept.push(res[i].dept_name);
        }
    });
}
// function to handle adding a new department
function addRoles() {
    deptList();
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of the role you're adding?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for the role you're adding?"
            },
            //    dont need a role id prompt-- role id is auto generated mysql
            // =======================NOT WORKING============= it's not jiving with dept id...
            // {
            //     name: "deptname",
            //     type: "list",
            //     message: "What department is this role part of?",
            //     choices: dept
            // }

        ])
        .then(function (answer) {
            // when finished prompting, insert new role with following info
            connection.query(
                // let deptname = 
                "INSERT INTO roles SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    // department_id: answer.deptname
                },
                function (err) {
                    if (err) throw err;
                    console.log("New role added successfully!");
                    // re-prompt if they would like to do something else
                    start();
                }
            );
        });
}

// function for generating role id list
function roleIdList() {
    connection.query("SELECT id, title FROM roles", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            roleIds.push(res[i].id, res[i].title);
        }
    });
}
// function for generating manager id list
function managerIdList() {
    connection.query("SELECT id, first_name, last_name FROM roles", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            roleIds.push(res[i].id, res[i].first_name, res[i].last_name);
        }
    });

}

function addEmployee() {
    roleIdList();
    // managerIdList(); -----breaks code------
    inquirer
        .prompt([
            {
                name: "firstname",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "lastname",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "roleid",
                type: "input",
                message: "Please enter their role id number."
            },
            {
                name: "managerid",
                type: "input",
                message: "Please enter their manager's id number."
            },
            // =======DISPLAYS TITLE AND NUMBER CORRECTLY IN LIST BUT says id is undefined===
            // {
            //     name: "roleid",
            //     type: "list",
            //     message: "What is their role id number?",
            //     choices: roleIds
            // },
            // {
            //     name: "managerid",
            //     type: "list",
            //     message: "Who is their manager?",
            //    choices: managers

            // },


        ])
        .then(function (answer) {
            // when finished prompting, insert new role with following info
            connection.query(
                "INSERT INTO employees SET ?",
                {
                    first_name: answer.firstname,
                    last_name: answer.lastname,
                    role_id: answer.roleid,
                    manager_id: answer.managerid,
                    // 
                    // role_id: answer.roleids.id,
                    // manager_id: answer.managerid.id
                },
                function (err) {
                    if (err) throw err;
                    console.log("New employee added successfully!");
                    // re-prompt if they would like to do something else
                    start();
                }
            );
        });
}
// function to handle viewing departments
// ======doesn't work==========no clue why=========
function viewDepartment() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        console.table(res)
        start();
    });
};

function viewRoles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        console.table(res)
        start();
    });
};

function viewEmployees() {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        console.table(res)
        start();
    });
};




    // function to handle viewing departments
// function viewEmployees(){
//     connection.query( "SELECT * FROM employees", function(err, res){
//         if (err) throw err;
//         console.log(`EMPLOYEES:`)
//         res.forEach(employee => {
//             console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`);
//         })
//         start();
//         });
//     };    

// function to handle viewing departments
// function viewRoles(){
//     connection.query( "SELECT * FROM roles", function(err, res){
//         if (err) throw err;
//         console.log(`EMPLOYEES:`)
//         res.forEach(role => {
//             console.log(`ID: ${role.id} | Name: ${role.title} ${role.salary} | Department ID: ${role.department_id}`);
//         })
//         start();
//         });
//     };  
