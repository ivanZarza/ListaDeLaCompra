const { Router } = require('express');
const router = Router();
const pasosRecetaController = require('../controller/usuario/pasosReceta.controller');
const verificarSesion = require('../../helpers/verificarSesion');

router.get('/', verificarSesion, pasosRecetaController.getPasosRecetas);
router.get('/:id', verificarSesion, pasosRecetaController.getUnPasoReceta);
router.post('/', verificarSesion, pasosRecetaController.postPasoReceta);
router.put('/:id', verificarSesion, pasosRecetaController.putPasoReceta);
router.delete('/:id', verificarSesion, pasosRecetaController.deletePasoReceta);

module.exports = router;
