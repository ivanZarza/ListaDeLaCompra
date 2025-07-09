const { Router } = require('express');
const router = Router();
const ingredientesController = require('../controller/ingredientes.controller');

router.get('/ingredientes', ingredientesController.getIngredientes);

module.exports = router;