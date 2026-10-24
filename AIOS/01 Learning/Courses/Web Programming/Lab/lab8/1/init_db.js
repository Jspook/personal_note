// init_db.js - สร้างตาราง books และเพิ่มข้อมูลตัวอย่าง
const conn = require('./database');

const createTableSQL = `
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL DEFAULT 0
)`;

const insertSQL = `
INSERT INTO books (id, title, author, category, price, quantity) VALUES
(8001, 'Clean Code', 'Robert Martin', 'Programming', 590.00, 12),
(8002, 'The Pragmatic Programmer', 'Andrew Hunt', 'Programming', 650.00, 8),
(8003, 'Sapiens', 'Yuval Harari', 'History', 420.00, 15),
(8004, 'Atomic Habits', 'James Clear', 'Self Help', 380.00, 20),
(8005, 'Database System Concepts', 'Abraham Silberschatz', 'Database', 720.00, 5),
(8006, 'You Don\\'t Know JS', 'Kyle Simpson', 'Programming', 450.00, 10),
(8007, 'Thinking Fast and Slow', 'Daniel Kahneman', 'Psychology', 480.00, 7),
(8008, 'The Lean Startup', 'Eric Ries', 'Business', 390.00, 14),
(8009, 'Design Patterns', 'Erich Gamma', 'Programming', 690.00, 6)
ON DUPLICATE KEY UPDATE title=VALUES(title)`;

conn.query(createTableSQL, (err) => {
    if (err) {
        console.error('Error creating table:', err);
        conn.end();
        return;
    }
    console.log('Table "books" created successfully.');

    conn.query(insertSQL, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
        } else {
            console.log(`Inserted/Updated ${result.affectedRows} rows.`);
        }
        conn.end();
    });
});
