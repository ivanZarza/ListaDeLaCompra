const { Router } = require('express');
const router = Router();
const ingredientesRecetaController = require('../controller/usuario/ingredientesReceta.controller');

router.get('/usuario/ingredientes', ingredientesRecetaController.getIngredientesRecetas);
router.get('/usuario/ingredientes/:id', ingredientesRecetaController.getUnIngredienteReceta);
router.post('/usuario/ingredientes', ingredientesRecetaController.postIngredienteReceta);
router.put('/usuario/ingredientes/:id', ingredientesRecetaController.putIngredienteReceta);
router.delete('/usuario/ingredientes/:id', ingredientesRecetaController.deleteIngredienteReceta);

module.exports = router;