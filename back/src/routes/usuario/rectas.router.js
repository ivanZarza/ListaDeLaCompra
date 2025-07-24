const { Router } = require('express');
const router = Router();
const recetasController = require('../controller/usuario/recetas.controller');

router.get('/recetas', recetasController.getRecetas);
router.get ('/recetas/:id', recetasController.getDetallesReceta);
router.post('/recetas', recetasController.postReceta);
router.put('/recetas/:id', recetasController.putReceta);
router.delete('/recetas/:id', recetasController.deleteReceta);

module.exports = router;