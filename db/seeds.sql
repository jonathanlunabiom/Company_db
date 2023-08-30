INSERT INTO department(name)
VALUES      ('Mid'),
            ('Major'),
            ('Over');

INSERT INTO roles (title,salary,department_id)
VALUES      ('Service',2500,1),
            ('Salesperson',3500,2),
            ('Software Engineer',3000,3);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES      ('Jonathan','Luna',1,NULL),
            ('Roberto','Desfa',3,1),
            ('Daniela','Burgos',2,1);