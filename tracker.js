// dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");
var util = require('util')
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
connection.query = util.promisify(connection.query)
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
            else if (answer.action === "View Departments") {
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
                "INSERT INTO departments SET ?",
                {
                    dept_name: answer.addingdept
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
    return connection.query("SELECT id, dept_name FROM departments");
}
// function to handle adding a new department
async function addRoles() {
    const dep = await deptList();
    const depChoices = dep.map(({ id, dept_name }) => ({
        name: dept_name,
        value: id
    }))


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
            {
                name: "department",
                type: "list",
                message: "what department is this role in",
                choices: depChoices
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert new role with following info
            connection.query(

                "INSERT INTO roles SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department
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
function roleList() {
    return connection.query("SELECT id, title FROM roles");
}
// function roleIdList() {
// MAP instead of loop MAKE ASYNC 
//     connection.query("SELECT id, title FROM roles", function (err, res) {
//         if (err) throw err;
//         for (let i = 0; i < res.length; i++) {
//             roleIds.push(res[i].id, res[i].title);
//         }
//     });
// }
// function for generating manager id list
function mgrList() {
    return connection.query("SELECT id, first_name, last_name FROM employees");
}
// function managerIdList() {
// MAP INSTEAD OF LOOP AND MAKE ASYNC
//     connection.query("SELECT id, first_name, last_name FROM roles", function (err, res) {
//         if (err) throw err;
//         for (let i = 0; i < res.length; i++) {
//             roleIds.push(res[i].id, res[i].first_name, res[i].last_name);
//         }
//     });

// }
async function addEmployee() {
    const rol = await roleList();
    const roleChoices = rol.map(({ id, title }) => ({
        name: title,
        value: id
    }));
    const mgr = await mgrList();
    // only showing last name when list comes up....Also what about people who don't have managers?
    const mgrChoices = mgr.map(({ id, first_name, last_name }) => ({
        name:  `${first_name} ${last_name}`,
        value: id
    }))
    // function addEmployee() {
    // roleIdList();
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
                // Go back and reformat for a list similar to the way adding depts is done
                name: "roleid",
                type: "list",
                message: "What is their role?",
                choices: roleChoices
            },
            {
                // ^^same as listing depts--need to map
                name: "managerid",
                type: "list",
                message: "Who is their manager?",
                choices: mgrChoices
            },
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
function viewDepartment() {
    console.log("here here")
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

// ===================doesn't work. not sure why =================
async function updateRole() {
    const emp = await empList();
    const empChoices = emp.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
      inquirer
        .prompt([
            {
                name: "employee",
                type: "list",
                message: "Which employee would you like to update?",
                choices: empChoices
            },
            {

                name: "newrole",
                type: "list",
                message: "What is their new role?",
                choices: roleChoices
            },
        ])
        .then(function (answer) {
            // when finished prompting, insert new role with following info
            connection.query(
                "UPDATE employees SET ?",
                {
                    role_id: answer.newrole,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee updated successfully!");
                    // re-prompt if they would like to do something else
                    start();
                }
            );
        });
    }

