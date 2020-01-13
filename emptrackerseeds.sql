USE employees_db;

INSERT INTO department (name) VALUES ("Customer Service");
INSERT INTO department (name) VALUES ("Design");
INSERT INTO department (name) VALUES ("Accounts Payable");
INSERT INTO department (name) VALUES ("Marketing");

INSERT INTO role (title, salary, department_id) VALUES ("Witcher", 80000.50, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Apprentice", 25,000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Mage", 75000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Bard", 22000.00, 4);

INSERT INTO employee (first_name, last_name, role_id) VALUES ("Geralt","Rivia", 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ciri","Centra", 2, 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Yennefer","Vengerberg", 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jaskier","Dandelion", 4, 1);




