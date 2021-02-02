CREATE DATABASE devops;

-- Set extension 
-- create extension if not exists "uuid-ossp";

CREATE TABLE users
(
    user_id uuid DEFAULT
    uuid_generate_v4(),
    user_companyname VARCHAR(255) NOT NULL ,
    user_domainname VARCHAR(255) NOT NULL,
    user_firstname VARCHAR(255) NOT NULL,
    user_lastname VARCHAR(255) NOT NULL,
    user_mobile VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_verification VARCHAR(255),
    user_role VARCHAR(255),
    user_resetPasswordLink VARCHAR(255),
    PRIMARY KEY (user_id)
);


CREATE TABLE issues
(
    issue_id SERIAL,
    user_id UUID,
    title VARCHAR(255) NOT NULL,
    services VARCHAR(255) NOT NULL,
    assign_to VARCHAR(255) NOT NULL,
    statusof VARCHAR(255) NOT NULL,
    priorities VARCHAR(255),
    created_at DATE DEFAULT CURRENT_DATE,
    breach VARCHAR(255),
    actions VARCHAR(255),
    PRIMARY KEY (issue_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- insert users

INSERT INTO users
    (user_companyname, user_domainname, user_firstname, user_lastname, user_mobile, user_email, user_password )
VALUES
    ('bobTech', 'www.bob.co.in', 'BOB', 'Builder', '+914544848784', 'bob@gmail.com', 'karan123');
--------------- 2 User------
INSERT INTO users
    (user_companyname, user_domainname, user_firstname, user_lastname, user_mobile, user_email, user_password )
VALUES
    ('johny', 'www.johny.co.in', 'johny', 'Builder', '+914544848784', 'johny@gmail.com', 'karan123');  

INSERT INTO issues
    (user_id, title, services, assign_to, statusof, priorities, breach, actions)
VALUES
    ('71e0cc0b-38fb-4286-9037-86b27140b420', 'web not working','Icgna', 'pawar', 'active', 'high', 'no','ack');

INSERT INTO issues
    (user_id, title, services, assign_to, statusof, priorities, breach, actions)
VALUES
    ('e66f362c-fa91-4a61-ab5c-1728dd03509a', 'server not working','server', 'pawar', 'pending', 'low', 'ye','resolve');
    
    INSERT INTO issues
    (user_id, title, services, assign_to, statusof, priorities, breach, actions)
VALUES
    ('4b1e0812-e406-4e2c-9a9e-73485d0a13e5', 'server not working','server', 'pawar', 'pending', 'low', 'ye','resolve');
    
INSERT INTO issues
    (user_id, title, services, assign_to, statusof, priorities, breach, actions)
VALUES
    ('4b1e0812-e406-4e2c-9a9e-73485d0a13e5', 'web not working','Icgna', 'pawar', 'active', 'high', 'no','ack');


