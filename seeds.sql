INSERT INTO department(name)
VALUES      ('Mid'),
            ('Major'),
            ('Over');

INSERT INTO roles (title,salary,department_id)
VALUES      ('Service',2500,1),
            ('Salesperson',3500,1),
            ('Software Engineer',3000,2);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES      ('Jonathan','Luna',1,NULL),
            ('Elisa','Desfa',3,1),
            ('Daniela','Burgos',2,1);