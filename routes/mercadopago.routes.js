const express= require('express');
const router = express.Router();
const prodCrtl = require('../controllers/productos.controllers');



router.get('/:id', prodCrtl.nuevoPago);
router.get('/', prodCrtl.pagoResp);

//mercadopago


module.exports = router;
