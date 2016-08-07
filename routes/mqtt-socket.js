var express = require('express');
var router = express.Router();
// auto uodate webpage
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mqtt-socket', { title: 'MQTT-Socket' });
});

module.exports = router;
