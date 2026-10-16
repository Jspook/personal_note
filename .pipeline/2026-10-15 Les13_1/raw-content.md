# raw-content (PUA Thai glyphs remapped)

<!-- page 1 -->
## [p.1]

Copyright © Oracle Corporation, 2001. All rights reserved.
Controlling User Access

<!-- page 2 -->
## [p.2]

13-2
Copyright © Oracle Corporation, 2001. All rights reserved.
Objectives
After completing this lesson, you should be able to 
do the following:
•
Create users
•
Create roles to ease setup and maintenance of the 
security model
•
Use the GRANT and REVOKE statements to grant 
and revoke object privileges
•
Create and access database links

<!-- page 3 -->
## [p.3]

13-3
Copyright © Oracle Corporation, 2001. All rights reserved.
Controlling User Access
Controlling User Access
Database
administrator
Users
Username and password
Privileges

<!-- page 4 -->
## [p.4]

13-4
Copyright © Oracle Corporation, 2001. All rights reserved.
Privileges
•
Database security:
–
System security
–
Data security
•
System privileges: Gaining access to the database
•
Object privileges: Manipulating the content of the 
database objects
•
Schemas: Collections of objects, such as tables, 
views, and sequences

<!-- page 5 -->
## [p.5]

13-5
Copyright © Oracle Corporation, 2001. All rights reserved.
System Privileges
•
More than 100 privileges are available.
•
The database administrator has high-level system 
privileges for tasks such as:
–
Creating new users
–
Removing users
–
Removing tables
–
Backing up tables

<!-- page 6 -->
## [p.6]

13-6
Copyright © Oracle Corporation, 2001. All rights reserved.
Creating Users
The DBA creates users by using the CREATE USER
statement.
CREATE USER  scott
IDENTIFIED BY   tiger;
User created.
CREATE USER user
IDENTIFIED BY   password;

<!-- page 7 -->
## [p.7]

13-7
Copyright © Oracle Corporation, 2001. All rights reserved.
User System Privileges
•
Once a user is created, the DBA can grant specific 
system privileges to a user.
•
An application developer, for example, may have 
the following system privileges:
–
CREATE SESSION
–
CREATE TABLE
–
CREATE SEQUENCE
–
CREATE VIEW
–
CREATE PROCEDURE
GRANT privilege [, privilege...]
TO user [, user| role, PUBLIC...];

<!-- page 8 -->
## [p.8]

13-8
Copyright © Oracle Corporation, 2001. All rights reserved.
Granting System Privileges
The DBA can grant a user specific system privileges.
GRANT  create session, create table, 
create sequence, create view
TO     scott;
Grant succeeded.

<!-- page 9 -->
## [p.9]

13-9
Copyright © Oracle Corporation, 2001. All rights reserved.
What is a Role?
What is a Role?
Allocating privileges
without a role
Allocating privileges
with a role
Privileges
Users
Manager

<!-- page 10 -->
## [p.10]

13-10
Copyright © Oracle Corporation, 2001. All rights reserved.
Creating and Granting Privileges to a Role
Creating and Granting Privileges to a Role
CREATE ROLE manager;
Role created.
GRANT create table, create view 
TO manager; 
Grant succeeded.
GRANT manager TO DEHAAN, KOCHHAR;     
Grant succeeded.
•
Create a role
•
Grant privileges to a role
•
Grant a role to users

<!-- page 11 -->
## [p.11]

13-11
Copyright © Oracle Corporation, 2001. All rights reserved.
Changing Your Password
•
The DBA creates your user account and initializes 
your password.
•
You can change your password by using the 
ALTER USER statement.
ALTER USER scott             
IDENTIFIED BY lion;
User altered.

<!-- page 12 -->
## [p.12]

13-12
Copyright © Oracle Corporation, 2001. All rights reserved.
Object 
Privilege 
Table
View
Sequence
Procedure
ALTER


DELETE


EXECUTE

INDEX

INSERT


REFERENCES


SELECT



UPDATE


Object Privileges
Object Privileges

<!-- page 13 -->
## [p.13]

13-13
Copyright © Oracle Corporation, 2001. All rights reserved.
Object Privileges
•
Object privileges vary from object to object.
•
An owner has all the privileges on the object.
•
An owner can give specific privileges on that 
owner’s object.
GRANT
object_priv [(columns)]
ON
object
TO
{user|role|PUBLIC}
[WITH GRANT OPTION];

<!-- page 14 -->
## [p.14]

13-14
Copyright © Oracle Corporation, 2001. All rights reserved.
Granting Object Privileges
•
Grant query privileges on the EMPLOYEES table.
•
Grant privileges to update specific columns to 
users and roles. 
GRANT  select
ON     employees
TO     sue, rich;
Grant succeeded.7
GRANT  update (department_name, location_id)
ON     departments
TO     scott, manager;
Grant succeeded.

<!-- page 15 -->
## [p.15]

13-15
Copyright © Oracle Corporation, 2001. All rights reserved.
Using the WITH GRANT OPTION and PUBLIC
Keywords
•
Give a user authority to pass along privileges.
•
Allow all users on the system to query data from 
Alice’s DEPARTMENTS table.
GRANT  select, insert
ON     departments
TO     scott
WITH   GRANT OPTION;
Grant succeeded.
GRANT  select
ON
alice.departments
TO
PUBLIC;
Grant succeeded.

<!-- page 16 -->
## [p.16]

13-16
Copyright © Oracle Corporation, 2001. All rights reserved.
Confirming Privileges Granted 
Confirming Privileges Granted 
Data Dictionary View
Description
ROLE_SYS_PRIVS
System privileges granted to roles
ROLE_TAB_PRIVS
Table privileges granted to roles
USER_ROLE_PRIVS
Roles accessible by the user
USER_TAB_PRIVS_MADE
Object privileges granted on the 
user’s objects
USER_TAB_PRIVS_RECD
Object privileges granted to the 
user
USER_COL_PRIVS_MADE
Object privileges granted on the 
columns of the user’s objects
USER_COL_PRIVS_RECD
Object privileges granted to the 
user on specific columns
USER_SYS_PRIVS
Lists system privileges granted to 
the user

<!-- page 17 -->
## [p.17]

13-17
Copyright © Oracle Corporation, 2001. All rights reserved.
How to Revoke Object Privileges
•
You use the REVOKE statement to revoke privileges 
granted to other users.
•
Privileges granted to others through the WITH 
GRANT OPTION clause are also revoked.
REVOKE {privilege [, privilege...]|ALL}
ON
object
FROM   {user[, user...]|role|PUBLIC}
[CASCADE CONSTRAINTS];

<!-- page 18 -->
## [p.18]

13-18
Copyright © Oracle Corporation, 2001. All rights reserved.
Revoking Object Privileges
As user Alice, revoke the SELECT and INSERT
privileges given to user Scott on the DEPARTMENTS
table.
REVOKE  select, insert
ON      departments
FROM    scott;
Revoke succeeded.

<!-- page 19 -->
## [p.19]

13-21
Copyright © Oracle Corporation, 2001. All rights reserved.
Summary
Summary
Statement
Action
CREATE USER
Creates a user (usually performed by 
a DBA)
GRANT
Gives other users privileges to 
access the your objects
CREATE ROLE
Creates a collection of privileges 
(usually performed by a DBA)
ALTER USER
Changes a user’s password
REVOKE
Removes privileges on an object from
users
In this lesson, you should have learned about DCL 
statements that control access to the database and 
database objects:

<!-- page 20 -->
## [p.20]

13-22
Copyright © Oracle Corporation, 2001. All rights reserved.
Practice 13 Overview
This practice covers the following topics: 
•
Granting other users privileges to your table
•
Modifying another user’s table through the 
privileges granted to you
•
Creating a synonym
•
Querying the data dictionary views related to 
privileges
