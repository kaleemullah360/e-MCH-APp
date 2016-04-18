var express = require('express');
var router = express.Router();
var mote_uri = 'aaaa::c30c:0:0:4';
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
message = "";
m_payload = "";

// create MYSQL Server connection to store data
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost', // default
  user     : 'root',  // default
  password : '',  // default
  database : 'e-mch' // app database name
});
connection.connect();

var mqtt = require('mqtt')
, client = mqtt.connect();
client.subscribe('iot-2/evt/status/fmt/json');

/* GET MQTT Data. */
//	http://localhost:3000/getMqttData?uri=aaaa::c30c:0:0:4
router.get('/', function(req, res, next) {
	var mote_uri = req.query.uri;

	client.on('message', function(topic, m_payload) {
		m_payload = decoder.write(message);
			message = m_payload;
			//client.end();

		//  populate database
	      //  MessageID, UpTime, ClockTime, Temperature, Battery, PowTrace  //<-- This
	      var string = "";
	      string =String(m_payload);
	      string = string.split(",");
	      var MessageID = string[0];
	      var UpTime = string[1];
	      var ClockTime = string[2];
	      var Temperature = string[3];
	      var Battery = string[4];
	      var PowTrace = string[5];
	      var Protocol = "MQTT";
	      connection.query('INSERT INTO `e-mch-table` (MessageID, UpTime, ClockTime, Temperature, Battery, Protocol, PowTrace) VALUES (\''+MessageID+'\',\''+UpTime+'\', \''+ClockTime+'\', \''+Temperature+'\', \''+Battery+'\', \''+Protocol+'\', \''+PowTrace+'\')', function(err, rows, fields) {
	      	if (err) throw err;
	      });
	});
res.send(message);
});

module.exports = router;