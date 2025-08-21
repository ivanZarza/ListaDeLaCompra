require('dotenv').config();
const mysql = require('mysql2');
const {
    DB_HOST = 'localhost',
    DB_USER = 'root',
    DB_PASSWORD = process.env.DB_PASSWORD || '',
    DB_NAME = 'materias_primas',
    DB_PORT = 3306,
} = process.env;
const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
}).promise();
module.exports = pool;
