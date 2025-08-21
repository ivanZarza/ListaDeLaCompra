const { Router } = require('express');
const router = Router();
const datosUsuarioController = require('../controller/datosUsuario.controller');
const verificarSesion = require('../helpers/verificarSesion');
router.get('/usuario', verificarSesion, datosUsuarioController.getDatosUsuario);
router.put('/usuario', verificarSesion, datosUsuarioController.putDatosUsuario);
router.delete('/usuario', verificarSesion, datosUsuarioController.deleteDatosUsuario);
module.exports = router;
