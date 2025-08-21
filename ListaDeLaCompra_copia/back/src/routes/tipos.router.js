const { Router } = require('express');
const router = Router();
const tiposController = require('../controller/tipos.controller');
router.get('/tipos', tiposController.getTipos);
module.exports = router;
