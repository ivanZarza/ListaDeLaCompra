const { Router } = require('express');
const router = Router();
const datosUsuarioController = require('../controller/datosUsuario.controller');
const verificarSesion = require('../helpers/verificarSesion');

router.get('/datosUsuario', verificarSesion, datosUsuarioController.getDatosUsuario);
router.put('/datosUsuario', verificarSesion, datosUsuarioController.putDatosUsuario);
router.delete('/datosUsuario', verificarSesion, datosUsuarioController.deleteDatosUsuario);

module.exports = router;
