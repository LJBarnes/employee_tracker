// dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");
// var other file = functions etc ?

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
connection.connect(function(err){
    if (err) throw err;
    console.log("connection made");
    // run the start function after connection to prompt user
    // start();
    connection.end();
    console.log("connection ended.");
});
