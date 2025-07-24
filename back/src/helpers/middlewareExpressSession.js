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

console.log(`Cargando variables de entorno: DB_HOST=${DB_HOST}, DB_NAME=${DB_NAME}, DB_PORT=${DB_PORT}, DB_USER=${DB_USER}, SESSION_SECRET=${SESSION_SECRET}`);


if (!SESSION_SECRET) {
  console.log('La clave de sesión no está definida en las variables de entorno');
}
if (!DB_HOST || !DB_NAME || !DB_PORT || !DB_USER || !DB_PASSWORD) {
  console.log('Las variables de entorno de la base de datos no están definidas correctamente');
}

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
    secure: false, // Cambia a true si usas HTTPS
    sameSite: 'lax', 
    maxAge: 3600000, 
  },
});

module.exports = sessionMiddleware;