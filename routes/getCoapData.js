var express = require('express');
var router = express.Router();
var mote_uri = 'aaaa::c30c:0:0:2';
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

var coap        = require('coap')

/* GET CoAP Data. */
//	http://localhost:3000/getCoapData?uri=aaaa::c30c:0:0:2
router.get('/', function(req, res, next) {
	var mote_uri = req.query.uri;
	var req = coap.request('coap://[' + mote_uri + ']:5683/sens/mote')
	req.on('response', function(resp) {
		res.send(decoder.write(resp.payload));
	})
	req.end()
});

module.exports = router;
