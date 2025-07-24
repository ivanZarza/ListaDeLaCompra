const { Router } = require('express');
const router = Router();
const registroController = require('../controller/registro.controller');

router.post('/registro', registroController.registrarUsuario);

module.exports = router;