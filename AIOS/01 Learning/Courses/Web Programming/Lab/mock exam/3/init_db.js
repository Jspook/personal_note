// Run once: node init_db.js  (re-running resets the table)
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS users');
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        display_name TEXT NOT NULL,
        role TEXT NOT NULL
    )`);
    const stmt = db.prepare('INSERT INTO users (username, password, display_name, role) VALUES (?, ?, ?, ?)');
    [
        ['admin', 'admin123', 'Head Keeper', 'admin'],
        ['jackpot', 'panda123', 'Jackpot', 'member'],
        ['guest', 'guest123', 'Guest Visitor', 'member']
    ].forEach(row => stmt.run(row));
    stmt.finalize(() => { console.log('users.db ready'); db.close(); });
});
