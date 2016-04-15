var express = require('express');
var router = express.Router();
var mote_uri = 'aaaa::c30c:0:0:3';
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

var request = require('request');

/* GET HTTP Data. */
//	http://localhost:3000/getHttpData?uri=aaaa::c30c:0:0:3
router.get('/', function(req, res, next) {
	var mote_uri = req.query.uri;
	request('http://['+mote_uri+']', function (error, response, h_payload) {
		if (!error && response.statusCode == 200) {
			res.send(h_payload);
		}
	})

});

module.exports = router;