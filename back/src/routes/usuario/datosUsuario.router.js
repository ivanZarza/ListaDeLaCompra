const { Router } = require('express');
const router = Router();
const datosUsuarioController = require('../controller/usuario/datosUsuario.controller');

router.get('/datosUsuario', datosUsuarioController.getDatosUsuario);
router.put('/datosUsuario', datosUsuarioController.putDatosUsuario);
router.delete('/datosUsuario', datosUsuarioController.deleteDatosUsuario);

module.exports = router;
