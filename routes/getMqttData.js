var express = require('express');
var router = express.Router();
var mote_uri = 'aaaa::c30c:0:0:4';
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
message = "";
m_message = "";
var mqtt = require('mqtt')
, client = mqtt.connect();
client.subscribe('iot-2/evt/status/fmt/json');

/* GET MQTT Data. */
//	http://localhost:3000/getMqttData?uri=aaaa::c30c:0:0:4
router.get('/', function(req, res, next) {
	var mote_uri = req.query.uri;

	client.on('message', function(topic, m_message) {
		console.log(decoder.write(m_message));
			message = m_message;
	});
res.send(decoder.write(message));
});

module.exports = router;