const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // ganti sesuai passwordmu
    database: 'resto_db' // pastikan DB ini sudah kamu buat
});

connection.connect((err) => {
    if (err) {
        console.error('Koneksi gagal:', err.stack);
        return;
    }
    console.log('Terhubung ke MySQL database.');
});

module.exports = connection;
