// Run once: node init_db.js  (re-running resets the table)
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./saleamount.db');

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS products');
    db.run(`CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        items_sold INTEGER NOT NULL
    )`);
    const stmt = db.prepare('INSERT INTO products (name, price, items_sold) VALUES (?, ?, ?)');
    [
        ['Americano', 55, 210],
        ['Latte', 70, 180],
        ['Cappuccino', 70, 95],
        ['Mocha', 80, 64],
        ['Green Tea', 60, 120],
        ['Thai Tea', 50, 260],
        ['Croissant', 65, 88],
        ['Cheesecake', 120, 41],
        ['Brownie', 75, 70],
        ['Bagel', 60, 52],
        ['Smoothie', 90, 77],
        ['Water', 15, 300]
    ].forEach(row => stmt.run(row));
    stmt.finalize(() => { console.log('saleamount.db ready'); db.close(); });
});
