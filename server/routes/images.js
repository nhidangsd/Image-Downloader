
var express = require('express');
var router = express.Router();
const imgCtr = require('../controllers/images');


/* GET home page. */
router.get('/images', imgCtr.imageController);

module.exports = router;
