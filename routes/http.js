var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('http', { title: 'HTTP' });
});

module.exports = router;
