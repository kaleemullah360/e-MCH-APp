var express = require('express');
var router = express.Router();

/* GET CoAP Home Page. */
router.get('/', function(req, res, next) {
  res.render('coap', { title: 'CoAP' });
});

module.exports = router;
