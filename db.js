const mysql = require('mysql2');
require('dotenv').config(); // Pastikan dotenv sudah diinstall

const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

module.exports = connection;
