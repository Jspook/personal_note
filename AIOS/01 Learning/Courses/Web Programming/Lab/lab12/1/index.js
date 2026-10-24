const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Middleware configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// SQLite Database connection
const dbPath = path.join(__dirname, 'customers.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to connect to database:', err.message);
    } else {
        console.log('Connected to SQLite database: customers.db');
    }
});

// Helper to get random customer from DB
const getRandomCustomer = (callback) => {
    const query = `SELECT CustomerId, FirstName, LastName, Address, Email, Phone FROM customers ORDER BY RANDOM() LIMIT 1`;
    db.get(query, [], (err, row) => {
        if (err) {
            console.error('Error fetching random customer:', err.message);
            return callback(err, null);
        }
        callback(null, row || {});
    });
};

// (A) สุ่มอ่านข้อมูลจาก database มา 1 รายการ แล้วแสดงในฟอร์ม
app.get('/', (req, res) => {
    getRandomCustomer((err, employee) => {
        if (err) {
            return res.status(500).send('Database Error');
        }
        res.render('index', { 
            employee: employee || {},
            message: 'Loaded random customer record from database.',
            messageType: 'info'
        });
    });
});

app.get('/random', (req, res) => {
    res.redirect('/');
});

// (B) เมื่อผู้ใช้คลิกปุ่ม Save Data ให้นำข้อมูลในฟอร์มไปจัดเก็บ cookie และลบข้อมูลในฟอร์มออก
app.post('/save', (req, res) => {
    const employeeData = {
        CustomerId: req.body.CustomerId || '',
        FirstName: req.body.FirstName || '',
        LastName: req.body.LastName || '',
        Address: req.body.Address || '',
        Email: req.body.Email || '',
        Phone: req.body.Phone || ''
    };

    const cookieOptions = {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: false // allow client/server cookie access
    };

    // Save as structured JSON cookie as well as individual field cookies
    res.cookie('employee', JSON.stringify(employeeData), cookieOptions);
    res.cookie('CustomerId', employeeData.CustomerId, cookieOptions);
    res.cookie('FirstName', employeeData.FirstName, cookieOptions);
    res.cookie('LastName', employeeData.LastName, cookieOptions);
    res.cookie('Address', employeeData.Address, cookieOptions);
    res.cookie('Email', employeeData.Email, cookieOptions);
    res.cookie('Phone', employeeData.Phone, cookieOptions);

    // ลบข้อมูลในฟอร์มออก
    res.render('index', { 
        employee: {}, 
        message: 'Data successfully saved to cookie and form cleared.',
        messageType: 'success'
    });
});

// (C) เมื่อผู้ใช้คลิกปุ่ม Show Data ให้นำข้อมูลที่เก็บไว้ โดย cookie มาแสดงในฟอร์ม
app.get('/show', (req, res) => {
    let employee = {};

    if (req.cookies && req.cookies.employee) {
        try {
            employee = typeof req.cookies.employee === 'string' ? JSON.parse(req.cookies.employee) : req.cookies.employee;
        } catch (e) {
            employee = {};
        }
    }

    if (!employee.CustomerId && req.cookies) {
        employee = {
            CustomerId: req.cookies.CustomerId || '',
            FirstName: req.cookies.FirstName || '',
            LastName: req.cookies.LastName || '',
            Address: req.cookies.Address || '',
            Email: req.cookies.Email || '',
            Phone: req.cookies.Phone || ''
        };
    }

    const hasData = employee.CustomerId || employee.FirstName || employee.LastName;

    res.render('index', { 
        employee: employee,
        message: hasData ? 'Showing data retrieved from cookie.' : 'No employee data found in cookie.',
        messageType: hasData ? 'info' : 'warning'
    });
});

// (D) เมื่อผู้ใช้คลิกปุ่ม Clear ให้ลบข้อมูลที่เก็บไว้ทั้งหมด จาก cookie และลบข้อมูลในฟอร์มออก
app.get('/clear', (req, res) => {
    res.clearCookie('employee');
    res.clearCookie('CustomerId');
    res.clearCookie('FirstName');
    res.clearCookie('LastName');
    res.clearCookie('Address');
    res.clearCookie('Email');
    res.clearCookie('Phone');

    res.render('index', { 
        employee: {}, 
        message: 'All cookie data has been cleared and form emptied.',
        messageType: 'warning'
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
