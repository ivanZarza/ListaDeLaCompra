require('dotenv').config(); // Cargar variables de entorno
const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session');
const sessionMiddleware = require('./helpers/middlewareExpressSession'); // Importar middleware de sesión


const ingredientesRouter = require('./routes/ingredientes.router');
const tiposRouter = require('./routes/tipos.router');
const registroRouter = require('./routes/registro.router');
const loginRouter = require('./routes/login.router');
const logoutController = require('./controller/logout.controller');
const recetasUsuarioRouter = require('./routes/usuario/recetas.router');
const ingredientesUsuarioRecetaRouter = require('./routes/usuario/ingredientesReceta.router');
const pasosUsuarioRecetaRouter = require('./routes/usuario/pasosReceta.router');

// Configuración de CORS para permitir cualquier origen y aceptar credencialeshttp://localhost:3000/api/listadelacompra/ingredientes
const corsOptions = {
	origin: (origin, callback) => {
		callback(null, true); // Permitir cualquier origen
	},
	credentials: true, // Permitir credenciales
};

app.use(sessionMiddleware);

app.use(cors(corsOptions), express.json())

app.use((req, res, next) => {
	console.log("Peticion recibida del cliente");
	console.log("URL: " + req.url);
	console.log("Metodo: " + req.method);
	console.log("User-agent: " + req.headers["user-agent"]);
	console.log("Headers", req.headers);
	next();
});

app.use('/api/listadelacompra/registro', registroRouter);
app.use('/api/listadelacompra/login', loginRouter);
app.use('/api/listadelacompra/logout', logoutController.postLogout);
app.use('/api/listadelacompra', tiposRouter);
app.use('/api/listadelacompra', ingredientesRouter);
app.use('/api/listadelacompra/usuario/recetas', recetasUsuarioRouter);
app.use('/api/listadelacompra/usuario/ingredientes', ingredientesUsuarioRecetaRouter);
app.use('/api/listadelacompra/usuario/pasos', pasosUsuarioRecetaRouter);






app.get('/api/listadelacompra', (req, res) => {
	res.send('¡Bienvenido a la API de tu lista de la compra!')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`);
})
 
