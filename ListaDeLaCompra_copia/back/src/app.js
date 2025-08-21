require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const sessionMiddleware = require('./helpers/middlewareExpressSession');
const ingredientesRouter = require('./routes/ingredientes.router');
const tiposRouter = require('./routes/tipos.router');
const registroRouter = require('./routes/registro.router');
const loginRouter = require('./routes/login.router');
const logoutRouter = require('./routes/logout.router');
const datosUsuarioRouter = require('./routes/datosUsuario.router');
const recetasUsuarioRouter = require('./routes/recetas.router');
const ingredientesUsuarioRecetaRouter = require('./routes/ingredientesReceta.router');
const pasosUsuarioRecetaRouter = require('./routes/pasosReceta.router');
const corsOptions = {
	origin: (origin, callback) => {
		callback(null, true);
	},
	credentials: true,
};
app.use(sessionMiddleware);
app.use(cors(corsOptions), express.json())
app.use((req, res, next) => {
	next();
});
app.use('/api/listadelacompra', registroRouter);
app.use('/api/listadelacompra', loginRouter);
app.use('/api/listadelacompra', logoutRouter);
app.use('/api/listadelacompra', tiposRouter);
app.use('/api/listadelacompra', ingredientesRouter);
app.use('/api/listadelacompra', datosUsuarioRouter);
app.use('/api/listadelacompra', recetasUsuarioRouter);
app.use('/api/listadelacompra', ingredientesUsuarioRecetaRouter);
app.use('/api/listadelacompra', pasosUsuarioRecetaRouter);
app.get('/api/listadelacompra', (req, res) => {
	res.send('¡Bienvenido a la API de tu lista de la compra!')
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
})
