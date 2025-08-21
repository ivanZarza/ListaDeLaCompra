require('dotenv').config();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const {
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_PASSWORD,
  DB_USER,
  SESSION_SECRET
} = process.env;
const sessionStore = new MySQLStore({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  createDatabaseTable: true,
  checkExpirationInterval: 900000,
  expiration: 3600000,
});
const sessionMiddleware = session({
  key: 'session_cookie',
  secret: SESSION_SECRET,
  store: sessionStore,
  proxy: true,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 3600000,
  },
});
module.exports = sessionMiddleware;
