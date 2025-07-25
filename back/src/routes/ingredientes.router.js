const { Router } = require('express');
const router = Router();
const ingredientesController = require('../controller/ingredientes.controller');
const verificarSesion = require('../helpers/verificarSesion');

router.get('/ingredientes', ingredientesController.getIngredientes);

module.exports = router;