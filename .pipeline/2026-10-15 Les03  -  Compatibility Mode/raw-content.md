# raw-content (PUA Thai glyphs remapped)

<!-- page 1 -->
## [p.1]

Copyright © Oracle Corporation, 2001. All rights reserved.
Single-Row Functions

<!-- page 2 -->
## [p.2]

3-2
Copyright © Oracle Corporation, 2001. All rights reserved.
Objectives
After completing this lesson, you should be able to 
do the following:
•
Describe various types of functions available
in SQL
•
Use character, number, and date functions in 
SELECT statements
•
Describe the use of conversion functions

<!-- page 3 -->
## [p.3]

3-3
Copyright © Oracle Corporation, 2001. All rights reserved.
SQL Functions
Function
Input
arg 1
arg 2
arg n
Function 
performs action
Output
Result
value

<!-- page 4 -->
## [p.4]

3-4
Copyright © Oracle Corporation, 2001. All rights reserved.
Two Types of SQL Functions
Functions
Single-row 
functions
Multiple-row
functions

<!-- page 5 -->
## [p.5]

3-5
Copyright © Oracle Corporation, 2001. All rights reserved.
Single-Row Functions
Single row functions:
•
Manipulate data items
•
Accept arguments and return one value
•
Act on each row returned
•
Return one result per row
•
May modify the data type
•
Can be nested
•
Accept arguments which can be a column or an 
expression
function_name [(arg1, arg2,...)]

<!-- page 6 -->
## [p.6]

3-6
Copyright © Oracle Corporation, 2001. All rights reserved.
Single-Row Functions
Conversion
Character
Number
Date
General
Single-row 
functions

<!-- page 7 -->
## [p.7]

3-7
Copyright © Oracle Corporation, 2001. All rights reserved.
Character Functions
Character
functions
LOWER
UPPER
INITCAP
CONCAT
SUBSTR
LENGTH
INSTR
LPAD | RPAD
TRIM
REPLACE
Case-manipulation 
functions
Character-manipulation
functions

<!-- page 8 -->
## [p.8]

3-8
Copyright © Oracle Corporation, 2001. All rights reserved.
Character Functions
Character
functions
LOWER
UPPER
INITCAP
CONCAT
SUBSTR
LENGTH
INSTR
LPAD | RPAD
TRIM
REPLACE
Case-manipulation 
functions
Character-manipulation
functions

<!-- page 9 -->
## [p.9]

3-9
Copyright © Oracle Corporation, 2001. All rights reserved.
Function
Result
Case Manipulation Functions
These functions convert case for character strings.
LOWER('SQL Course')
UPPER('SQL Course')
INITCAP('SQL Course')
sql course
SQL COURSE
Sql Course

<!-- page 10 -->
## [p.10]

3-10
Copyright © Oracle Corporation, 2001. All rights reserved.
Using Case Manipulation Functions
Display the employee number, name, and department 
number for employee Higgins:
SELECT employee_id, last_name, department_id
FROM   employees
WHERE  last_name = 'higgins';
no rows selected
SELECT employee_id, last_name, department_id
FROM   employees
WHERE  LOWER(last_name) = 'higgins';

<!-- page 11 -->
## [p.11]

3-11
Copyright © Oracle Corporation, 2001. All rights reserved.
CONCAT('Hello', 'World')
SUBSTR('HelloWorld',1,5)
LENGTH('HelloWorld')
INSTR('HelloWorld', 'W')
LPAD(salary,10,'*')
RPAD(salary, 10, '*')
TRIM('H' FROM 'HelloWorld')
HelloWorld
Hello
10
6
*****24000
24000*****
elloWorld
Function
Result
Character-Manipulation Functions
These functions manipulate character strings:

<!-- page 12 -->
## [p.12]

3-12
Copyright © Oracle Corporation, 2001. All rights reserved.
SELECT employee_id, CONCAT(first_name, last_name) NAME, 
job_id, LENGTH (last_name), 
INSTR(last_name, 'a') "Contains 'a'?"
FROM   employees
WHERE  SUBSTR(job_id, 4) = 'REP';
Using the Character-Manipulation 
Functions
1
2
3
1
2
3

<!-- page 13 -->
## [p.13]

3-13
Copyright © Oracle Corporation, 2001. All rights reserved.
Number Functions
•
ROUND: Rounds value to specified decimal
ROUND(45.926, 2)
45.93
•
TRUNC: Truncates value to specified decimal
TRUNC(45.926, 2)
45.92
•
MOD: Returns remainder of division
MOD(1600, 300)
100

<!-- page 14 -->
## [p.14]

3-14
Copyright © Oracle Corporation, 2001. All rights reserved.
SELECT ROUND(45.923,2), ROUND(45.923,0),
ROUND(45.923,-1)
FROM   DUAL;
Using the ROUND Function
DUAL is a dummy table you can use to view results 
from functions and calculations.
1
2
3
3
1
2

<!-- page 15 -->
## [p.15]

3-15
Copyright © Oracle Corporation, 2001. All rights reserved.
SELECT  TRUNC(45.923,2), TRUNC(45.923),
TRUNC(45.923,-2)
FROM   DUAL;
Using the TRUNC Function
3
1
2
1
2
3

<!-- page 16 -->
## [p.16]

3-16
Copyright © Oracle Corporation, 2001. All rights reserved.
SELECT last_name, salary, MOD(salary, 5000)
FROM   employees
WHERE  job_id = 'SA_REP';
Using the MOD Function
Calculate the remainder of a salary after it is divided 
by 5000 for all employees whose job title is sales 
representative.

<!-- page 17 -->
## [p.17]

3-17
Copyright © Oracle Corporation, 2001. All rights reserved.
Working with Dates
•
Oracle database stores dates in an internal 
numeric format: century, year, month, day, hours, 
minutes, seconds.
•
The default date display format is DD-MON-RR.
–
Allows you to store 21st century dates in the 20th 
century by specifying only the last two digits of the 
year. 
–
Allows you to store 20th century dates in the 21st 
century in the same way. 
SELECT last_name, hire_date
FROM   employees
WHERE  last_name like 'G%';

<!-- page 18 -->
## [p.18]

3-18
Copyright © Oracle Corporation, 2001. All rights reserved.
Working with Dates
SYSDATE is a function that returns:
•
Date 
•
Time

<!-- page 19 -->
## [p.19]

3-19
Copyright © Oracle Corporation, 2001. All rights reserved.
Arithmetic with Dates
•
Add or subtract a number to or from a date for a 
resultant date value.
•
Subtract two dates to find the number of days 
between those dates.
•
Add hours to a date by dividing the number of 
hours by 24.

<!-- page 20 -->
## [p.20]

3-20
Copyright © Oracle Corporation, 2001. All rights reserved.
Using Arithmetic Operators
with Dates
SELECT last_name, (SYSDATE-hire_date)/7 AS WEEKS
FROM   employees
WHERE  department_id = 90;

<!-- page 21 -->
## [p.21]

3-21
Copyright © Oracle Corporation, 2001. All rights reserved.
Date Functions
Number of months
between two dates
MONTHS_BETWEEN
ADD_MONTHS
NEXT_DAY
LAST_DAY
ROUND
TRUNC 
Add calendar months to 
date
Next day of the date 
specified
Last day of the month
Round date 
Truncate date
Function
Description

<!-- page 22 -->
## [p.22]

3-22
Copyright © Oracle Corporation, 2001. All rights reserved.
• MONTHS_BETWEEN ('01-SEP-95','11-JAN-94')
Using Date Functions
• ADD_MONTHS ('11-JAN-94',6)
• NEXT_DAY ('01-SEP-95','FRIDAY') 
• LAST_DAY('01-FEB-95')
19.6774194
'11-JUL-94'
'08-SEP-95'
'28-FEB-95'

<!-- page 23 -->
## [p.23]

3-23
Copyright © Oracle Corporation, 2001. All rights reserved.
• ROUND(SYSDATE,'MONTH')         01-AUG-95
• ROUND(SYSDATE ,'YEAR')         01-JAN-96
• TRUNC(SYSDATE ,'MONTH')        01-JUL-95 
• TRUNC(SYSDATE ,'YEAR')         01-JAN-95
Using Date Functions
Assume SYSDATE = '25-JUL-95':

<!-- page 24 -->
## [p.24]

3-24
Copyright © Oracle Corporation, 2001. All rights reserved.
Practice 3, Part One: Overview
This practice covers the following topics:
•
Writing a query that displays the current date 
•
Creating queries that require the use of numeric, 
character, and date functions
•
Performing calculations of years and months of 
service for an employee

<!-- page 25 -->
## [p.25]

3-25
Copyright © Oracle Corporation, 2001. All rights reserved.
Conversion Functions
Implicit data type
conversion
Explicit data type
conversion
Data type
conversion

<!-- page 26 -->
## [p.26]

3-26
Copyright © Oracle Corporation, 2001. All rights reserved.
Implicit Data Type Conversion
For assignments, the Oracle server can automatically
convert the following:
VARCHAR2 or CHAR
From
To
VARCHAR2 or CHAR
NUMBER
DATE
NUMBER
DATE
VARCHAR2
VARCHAR2

<!-- page 27 -->
## [p.27]

3-27
Copyright © Oracle Corporation, 2001. All rights reserved.
Implicit Data Type Conversion
For expression evaluation, the Oracle Server can 
automatically convert the following:
VARCHAR2 or CHAR
From
To
VARCHAR2 or CHAR
NUMBER
DATE

<!-- page 28 -->
## [p.28]

3-28
Copyright © Oracle Corporation, 2001. All rights reserved.
Explicit Data Type Conversion
NUMBER
CHARACTER
TO_CHAR
TO_NUMBER
DATE
TO_CHAR
TO_DATE

<!-- page 29 -->
## [p.29]

3-29
Copyright © Oracle Corporation, 2001. All rights reserved.
Explicit Data Type Conversion
NUMBER
CHARACTER
TO_CHAR
TO_NUMBER
DATE
TO_CHAR
TO_DATE

<!-- page 30 -->
## [p.30]

3-30
Copyright © Oracle Corporation, 2001. All rights reserved.
Explicit Data Type Conversion
NUMBER
CHARACTER
TO_CHAR
TO_NUMBER
DATE
TO_CHAR
TO_DATE

<!-- page 31 -->
## [p.31]

3-31
Copyright © Oracle Corporation, 2001. All rights reserved.
Using the TO_CHAR Function with Dates
The format model:
•
Must be enclosed in single quotation marks and is case 
sensitive
•
Can include any valid date format element
•
Has an fm element to remove padded blanks or 
suppress leading zeros
•
Is separated from the date value by a comma
TO_CHAR(date, 'format_model')

<!-- page 32 -->
## [p.32]

3-32
Copyright © Oracle Corporation, 2001. All rights reserved.
YYYY
Elements of the Date Format Model
YEAR
MM
MONTH
DY
DAY
Full year in numbers
Year spelled out
Two-digit value for month
Three-letter abbreviation of the 
day of the week
Full name of the day of the week
Full name of the month
MON
Three-letter abbreviation of the 
month
DD
Numeric day of the month

<!-- page 33 -->
## [p.33]

3-33
Copyright © Oracle Corporation, 2001. All rights reserved.

<!-- page 34 -->
## [p.34]

3-34
Copyright © Oracle Corporation, 2001. All rights reserved.
Elements of the Date Format Model
• Time elements format the time portion of the date.
• Add character strings by enclosing them in double 
quotation marks.
• Number suffixes spell out numbers.
HH24:MI:SS AM
15:45:32 PM
DD "of" MONTH
12 of OCTOBER
ddspth
fourteenth

<!-- page 35 -->
## [p.35]

3-35
Copyright © Oracle Corporation, 2001. All rights reserved.

<!-- page 36 -->
## [p.36]

3-36
Copyright © Oracle Corporation, 2001. All rights reserved.
Using the TO_CHAR Function with Dates
SELECT last_name,
TO_CHAR(hire_date, 'fmDD Month YYYY')
AS HIREDATE
FROM   employees;
…

<!-- page 37 -->
## [p.37]

3-37
Copyright © Oracle Corporation, 2001. All rights reserved.
Using the TO_CHAR Function with 
Numbers
These are some of the format elements you can use 
with the TO_CHAR function to display a number value 
as a character:
TO_CHAR(number, 'format_model')
9
0
$
L
.
,
Represents a number
Forces a zero to be displayed
Places a floating dollar sign
Uses the floating local currency symbol
Prints a decimal point
Prints a thousand indicator

<!-- page 38 -->
## [p.38]

3-38
Copyright © Oracle Corporation, 2001. All rights reserved.
SELECT TO_CHAR(salary, '$99,999.00') SALARY
FROM   employees
WHERE  last_name = 'Ernst';
Using the TO_CHAR Function with Numbers

<!-- page 39 -->
## [p.39]

3-39
Copyright © Oracle Corporation, 2001. All rights reserved.
Using the TO_NUMBER and TO_DATE
Functions 
•
Convert a character string to a number format 
using the TO_NUMBER function:
•
Convert a character string to a date format using 
the TO_DATE function:
•
These functions have an fx modifier. This modifier 
specifies the exact matching for the character 
argument and date format model of a TO_DATE
function
TO_NUMBER(char[, 'format_model'])
TO_DATE(char[, 'format_model'])

<!-- page 40 -->
## [p.40]

3-40
Copyright © Oracle Corporation, 2001. All rights reserved.
Using the TO_NUMBER and TO_DATE
Functions 
•
Convert a character string to a number format 
using the TO_NUMBER function:
•
Convert a character string to a date format using 
the TO_DATE function:
•
These functions have an fx modifier. This modifier 
specifies the exact matching for the character 
argument and date format model of a TO_DATE
function
TO_NUMBER(char[, 'format_model'])
TO_DATE(char[, 'format_model'])

<!-- page 41 -->
## [p.41]

3-41
Copyright © Oracle Corporation, 2001. All rights reserved.
RR Date Format
Current Year
1995
1995
2001
2001
Specified Date
27-OCT-95
27-OCT-17
27-OCT-17
27-OCT-95
RR Format
1995
2017
2017
1995
YY Format
1995
1917
2017
2095
If two digits 
of the 
current 
year are:
0–49
0–49
50–99
50–99
The return date is in 
the current century
The return date is in 
the century after 
the current one
The return date is in 
the century before 
the current one
The return date is in 
the current century
If the specified two-digit year is:

<!-- page 42 -->
## [p.42]

3-42
Copyright © Oracle Corporation, 2001. All rights reserved.
Example of RR Date Format
To find employees hired prior to 1990, use the RR
format, which produces the same results whether the 
command is run in 1999 or now:
SELECT last_name, TO_CHAR(hire_date, 'DD-Mon-YYYY')
FROM  employees
WHERE hire_date < TO_DATE('01-Jan-90', 'DD-Mon-RR');

<!-- page 43 -->
## [p.43]

3-43
Copyright © Oracle Corporation, 2001. All rights reserved.
Nesting Functions
•
Single-row functions can be nested to any level.
•
Nested functions are evaluated from deepest level 
to the least deep level.
F3(F2(F1(col,arg1),arg2),arg3)
Step 1 = Result 1
Step 2 = Result 2
Step 3 = Result 3

<!-- page 44 -->
## [p.44]

3-44
Copyright © Oracle Corporation, 2001. All rights reserved.
SELECT last_name,
NVL(TO_CHAR(manager_id), 'No Manager')
FROM   employees
WHERE  manager_id IS NULL;
Nesting Functions

<!-- page 45 -->
## [p.45]

3-45
Copyright © Oracle Corporation, 2001. All rights reserved.
General Functions
These functions work with any data type and pertain
to using nulls.
•
NVL (expr1, expr2)
•
NVL2 (expr1, expr2, expr3)
•
NULLIF (expr1, expr2)
•
COALESCE (expr1, expr2, ..., exprn)

<!-- page 46 -->
## [p.46]

3-46
Copyright © Oracle Corporation, 2001. All rights reserved.
NVL Function
Converts a null to an actual value.
•
Data types that can be used are date, character, 
and number.
•
Data types must match:
–
NVL(commission_pct,0)
–
NVL(hire_date,'01-JAN-97')
–
NVL(job_id,'No Job Yet')

<!-- page 47 -->
## [p.47]

3-47
Copyright © Oracle Corporation, 2001. All rights reserved.
SELECT last_name, salary, NVL(commission_pct, 0),
(salary*12) + (salary*12*NVL(commission_pct, 0)) AN_SAL
FROM employees;
Using the NVL Function
…
1
2
1
2

<!-- page 48 -->
## [p.48]

3-48
Copyright © Oracle Corporation, 2001. All rights reserved.
SELECT last_name,  salary, commission_pct,
NVL2(commission_pct, 
'SAL+COMM', 'SAL') income
FROM   employees WHERE department_id IN (50, 80);
Using the NVL2 Function
1
2
1
2

<!-- page 49 -->
## [p.49]

3-49
Copyright © Oracle Corporation, 2001. All rights reserved.
SELECT first_name, LENGTH(first_name) "expr1", 
last_name,  LENGTH(last_name)  "expr2",
NULLIF(LENGTH(first_name), LENGTH(last_name)) result
FROM   employees;
Using the NULLIF Function
…
1
2
3
1
2
3

<!-- page 50 -->
## [p.50]

3-50
Copyright © Oracle Corporation, 2001. All rights reserved.
Using the COALESCE Function
•
The advantage of the COALESCE function over the 
NVL function is that the COALESCE function can 
take multiple alternate values.
•
If the first expression is not null, it returns that 
expression; otherwise, it does a COALESCE of the 
remaining  expressions.

<!-- page 51 -->
## [p.51]

3-51
Copyright © Oracle Corporation, 2001. All rights reserved.
SELECT   last_name,
COALESCE(commission_pct, salary, 10) comm
FROM     employees
ORDER BY commission_pct;
Using the COALESCE Function
…

<!-- page 52 -->
## [p.52]

3-52
Copyright © Oracle Corporation, 2001. All rights reserved.
Conditional Expressions
•
Provide the use of IF-THEN-ELSE logic within a 
SQL statement
•
Use two methods:
–
CASE expression
–
DECODE function

<!-- page 53 -->
## [p.53]

3-53
Copyright © Oracle Corporation, 2001. All rights reserved.
The CASE Expression
Facilitates conditional inquiries by doing the work of 
an IF-THEN-ELSE statement:
CASE expr WHEN comparison_expr1 THEN return_expr1
[WHEN comparison_expr2 THEN return_expr2
WHEN comparison_exprn THEN return_exprn
ELSE else_expr]
END

<!-- page 54 -->
## [p.54]

3-54
Copyright © Oracle Corporation, 2001. All rights reserved.
SELECT last_name, job_id, salary,
CASE job_id WHEN 'IT_PROG'  THEN  1.10*salary
WHEN 'ST_CLERK' THEN  1.15*salary
WHEN 'SA_REP'   THEN  1.20*salary
ELSE      salary END     "REVISED_SALARY"
FROM   employees;
Using the CASE Expression
Facilitates conditional inquiries by doing the work of 
an IF-THEN-ELSE statement:
…
…

<!-- page 55 -->
## [p.55]

3-55
Copyright © Oracle Corporation, 2001. All rights reserved.
The DECODE Function
Facilitates conditional inquiries by doing the work of 
a CASE or IF-THEN-ELSE statement:
DECODE(col|expression, search1, result1 
[, search2, result2,...,]
[, default])

<!-- page 56 -->
## [p.56]

3-56
Copyright © Oracle Corporation, 2001. All rights reserved.
Using the DECODE Function
SELECT last_name, job_id, salary,
DECODE(job_id, 'IT_PROG',  1.10*salary,
'ST_CLERK', 1.15*salary,
'SA_REP',   1.20*salary,
salary)
REVISED_SALARY
FROM   employees;
…
…

<!-- page 57 -->
## [p.57]

3-57
Copyright © Oracle Corporation, 2001. All rights reserved.
Using the DECODE Function
SELECT last_name, salary,
DECODE (TRUNC(salary/2000, 0),
0, 0.00,
1, 0.09,
2, 0.20,
3, 0.30,
4, 0.40,
5, 0.42,
6, 0.44,
0.45) TAX_RATE
FROM   employees
WHERE  department_id = 80;
Display the applicable tax rate for each employee in 
department 80.

<!-- page 58 -->
## [p.58]

3-58
Copyright © Oracle Corporation, 2001. All rights reserved.
Summary
In this lesson, you should have learned how to: 
•
Perform calculations on data using functions
•
Modify individual data items using functions
•
Manipulate output for groups of rows using 
functions
•
Alter date formats for display using functions
•
Convert column data types using functions
•
Use NVL functions
•
Use IF-THEN-ELSE logic

<!-- page 59 -->
## [p.59]

3-59
Copyright © Oracle Corporation, 2001. All rights reserved.
Practice 3, Part Two: Overview
This practice covers the following topics:
•
Creating queries that require the use of numeric, 
character, and date functions
•
Using concatenation with functions
•
Writing case-insensitive queries to test the 
usefulness of character functions
•
Performing calculations of years and months of 
service for an employee
•
Determining the review date for an employee

<!-- page 60 -->
## [p.60]

3-60
Copyright © Oracle Corporation, 2001. All rights reserved.

<!-- page 61 -->
## [p.61]

3-61
Copyright © Oracle Corporation, 2001. All rights reserved.

<!-- page 62 -->
## [p.62]

3-62
Copyright © Oracle Corporation, 2001. All rights reserved.

<!-- page 63 -->
## [p.63]

3-63
Copyright © Oracle Corporation, 2001. All rights reserved.

<!-- page 64 -->
## [p.64]

3-64
Copyright © Oracle Corporation, 2001. All rights reserved.

<!-- page 65 -->
## [p.65]

3-65
Copyright © Oracle Corporation, 2001. All rights reserved.

<!-- page 66 -->
## [p.66]

3-66
Copyright © Oracle Corporation, 2001. All rights reserved.
