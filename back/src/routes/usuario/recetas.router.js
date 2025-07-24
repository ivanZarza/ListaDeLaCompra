const { Router } = require('express');
const router = Router();
const recetasController = require('../../controller/usuario/recetas.controller');
const verificarSesion = require('../../helpers/verificarSesion');

router.get('/usuario/recetas', verificarSesion, recetasController.getRecetas);
router.get ('/usuario/recetas/:id', verificarSesion, recetasController.getDetallesReceta);
router.post('/usuario/recetas', verificarSesion, recetasController.postReceta);
router.put('/usuario/recetas/:id', verificarSesion, recetasController.putReceta);
router.delete('/usuario/recetas/:id', verificarSesion, recetasController.deleteReceta);

module.exports = router;