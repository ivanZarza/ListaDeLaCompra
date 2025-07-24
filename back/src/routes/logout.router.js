const { Router } = require('express');
const router = Router();
const logoutController = require('../controller/logout.controller');

router.post('/logout', logoutController.postLogout);

module.exports = router;