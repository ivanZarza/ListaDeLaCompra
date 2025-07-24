const { Router } = require('express');
const router = Router();
const pasosRecetaController = require('../../controller/usuario/pasosReceta.controller');
const verificarSesion = require('../../helpers/verificarSesion');

router.get('/usuario/pasosReceta', verificarSesion, pasosRecetaController.getPasosRecetas);
router.get('/usuario/pasosReceta/:id', verificarSesion, pasosRecetaController.getUnPasoReceta);
router.post('/usuario/pasosReceta', verificarSesion, pasosRecetaController.postPasoReceta);
router.put('/usuario/pasosReceta/:id', verificarSesion, pasosRecetaController.putPasoReceta);
router.delete('/usuario/pasosReceta/:id', verificarSesion, pasosRecetaController.deletePasoReceta);

module.exports = router;
