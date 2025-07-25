const { Router } = require('express');
const router = Router();
const ingredientesRecetaController = require('../controller/ingredientesReceta.controller');
const verificarSesion = require('../helpers/verificarSesion');

router.get('/usuario/ingredientes', verificarSesion, ingredientesRecetaController.getIngredientesRecetas);
router.get('/usuario/ingredientes/:id', verificarSesion, ingredientesRecetaController.getUnIngredienteReceta);
router.post('/usuario/ingredientes', verificarSesion, ingredientesRecetaController.postIngredienteReceta);
router.put('/usuario/ingredientes/:id', verificarSesion, ingredientesRecetaController.putIngredienteReceta);
router.delete('/usuario/ingredientes/:id', verificarSesion, ingredientesRecetaController.deleteIngredienteReceta);

module.exports = router;