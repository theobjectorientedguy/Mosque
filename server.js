const express = require('express');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'src')));

app.get('/api/prayer-times', (req, res) => {
    const prayerTimes = [];

    fs.createReadStream('./src/public/prayer-times.csv')
        .pipe(csv())
        .on('data', (row) => {
            prayerTimes.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            console.log('Prayer Times Data:', prayerTimes); // Log the data to verify
            res.json(prayerTimes);
        })
        .on('error', (err) => {
            console.error('Error reading CSV file:', err);
            res.status(500).json({ error: 'Failed to read CSV file' });
        });
});

app.get('/api/iqamah-times', (req, res) => {
    const iqamahTimes = [];

    fs.createReadStream('./src/public/iqamah-times.csv')
        .pipe(csv())
        .on('data', (row) => {
            iqamahTimes.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            console.log('Iqamah Times Data:', iqamahTimes); // Log the data to verify
            res.json(iqamahTimes);
        })
        .on('error', (err) => {
            console.error('Error reading CSV file:', err);
            res.status(500).json({ error: 'Failed to read CSV file' });
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
