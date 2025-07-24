const { Router } = require('express');
const router = Router();
const pasosRecetaController = require('../controller/usuario/pasosReceta.controller');

router.get('/', pasosRecetaController.getPasosRecetas);
router.get('/:id', pasosRecetaController.getUnPasoReceta);
router.post('/', pasosRecetaController.postPasoReceta);
router.put('/:id', pasosRecetaController.putPasoReceta);
router.delete('/:id', pasosRecetaController.deletePasoReceta);

module.exports = router;
