const { Router } = require('express');
const router = Router();
const recetasController = require('../controller/usuario/recetas.controller');

router.get('/usuario/recetas', recetasController.getRecetas);
router.get ('/usuario/recetas/:id', recetasController.getDetallesReceta);
router.post('/usuario/recetas', recetasController.postReceta);
router.put('/usuario/recetas/:id', recetasController.putReceta);
router.delete('/usuario/recetas/:id', recetasController.deleteReceta);

module.exports = router;