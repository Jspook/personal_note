// Run once: node init_db.js  (re-running resets the table)
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./keepers.db');

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS keepers');
    db.run(`CREATE TABLE keepers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        zoo TEXT NOT NULL,
        role TEXT NOT NULL,
        salary INTEGER NOT NULL
    )`);
    const stmt = db.prepare('INSERT INTO keepers (name, zoo, role, salary) VALUES (?, ?, ?, ?)');
    [
        ['Somchai', 'Chiang Mai Zoo', 'Head Keeper', 32000],
        ['Malee', 'Chiang Mai Zoo', 'Veterinarian', 41000],
        ['Anan', 'Bangkok Safari', 'Keeper', 22000],
        ['Pim', 'Bangkok Safari', 'Trainer', 25000],
        ['Krit', 'Khao Kheow Zoo', 'Keeper', 21000]
    ].forEach(row => stmt.run(row));
    stmt.finalize(() => { console.log('keepers.db ready'); db.close(); });
});
