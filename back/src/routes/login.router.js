const { Router } = require('express');
const router = Router();
const loginController = require('../controller/login.controller');

router.post('/login', loginController.loginUsuario);

module.exports = router;