const express= require('express');
const router = express.Router();
const prodCrtl = require('../controllers/productos.controllers');
var geoip = require('geoip-lite');

router.route('/').get( function (req, res) {
    var ip = String(req.ip);
    var ip2 =  ip.slice(0,6);
    console.log(ip)
    var geo = geoip.lookup('181.46.78.113'); //poner ip una vez en product
    res.json(geo)
    
    
})


module.exports = router;
