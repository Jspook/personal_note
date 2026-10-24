const fs = require('fs');
const csv = require('csv-parser');
const conn = require('./database');

const createTableSQL = `
CREATE TABLE IF NOT EXISTS albums (
    id INT AUTO_INCREMENT PRIMARY KEY,
    song VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    album VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    genre VARCHAR(100) NOT NULL,
    album_cover VARCHAR(255) NOT NULL
)`;

conn.query(createTableSQL, (err) => {
    if (err) {
        console.error('Error creating table:', err);
        conn.end();
        return;
    }
    console.log('Table "albums" created or verified successfully.');

    // Clear existing data (optional, to avoid duplicates on multiple runs)
    conn.query('TRUNCATE TABLE albums', (err) => {
        if (err) console.log('Could not truncate, maybe first run.');

        let count = 0;
        const results = [];
        
        fs.createReadStream('albums.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                const insertSQL = 'INSERT INTO albums (song, artist, album, year, genre, album_cover) VALUES ?';
                const values = results.map(row => [row.song, row.artist, row.album, parseInt(row.year), row.genre, row.album_cover]);
                
                if (values.length > 0) {
                    conn.query(insertSQL, [values], (err, result) => {
                        if (err) {
                            console.error('Error inserting data:', err);
                        } else {
                            console.log(`Inserted ${result.affectedRows} albums into the database.`);
                        }
                        conn.end();
                    });
                } else {
                    console.log('No data found in CSV.');
                    conn.end();
                }
            });
    });
});
