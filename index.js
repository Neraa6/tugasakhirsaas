const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/db.js'); 
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('API RESTO AKTIF 🍽️');
});

app.get('/restaurants', (req, res) => {
    db.query('SELECT * FROM restaurant', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});


app.get('/restaurants/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM restaurant WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Restoran tidak ditemukan');
        res.json(results[0]);
    });
});



app.post('/restaurants', (req, res) => {
    const { name, address, phone_number, rating } = req.body;
    db.query(
        'INSERT INTO restaurant (name, address, phone_number, rating) VALUES (?, ?, ?, ?)',
        [name, address, phone_number, rating],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId, message: 'Restoran ditambahkan' });
        }
    );
});


app.get('/menus', (req, res) => {
    db.query('SELECT * FROM menu', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});



app.get('/menus/restaurant/:restaurant_id', (req, res) => {
    const { restaurant_id } = req.params;
    db.query('SELECT * FROM menu WHERE restaurant_id = ?', [restaurant_id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// POST menu baru
app.post('/menus', (req, res) => {
    const { restaurant_id, name, description, price, available } = req.body;
    db.query(
        'INSERT INTO menu (restaurant_id, name, description, price, available) VALUES (?, ?, ?, ?, ?)',
        [restaurant_id, name, description, price, available],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId, message: 'Menu ditambahkan' });
        }
    );
});

app.listen(port, () => {
    console.log(`Server aktif di http://localhost:${port}`);
});
