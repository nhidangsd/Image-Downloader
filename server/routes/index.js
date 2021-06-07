
var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  const pathFile = path.join(__dirname, '..', '')
  res.render('index', {title: 'Image Server'})
});

module.exports = router;
