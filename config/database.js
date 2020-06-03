require('dotenv').config();
const mysql = require('mysql2');


const database = mysql.createPool({
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true
});


module.exports = database;