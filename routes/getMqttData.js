var express = require('express');
var router = express.Router();
var mote_uri = 'aaaa::c30c:0:0:4';
var request_counter = 1;
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
m_payload = "";
// create MYSQL Server connection to store data
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost', // default
  user     : 'root',  // default
  password : '',  // default
  database : 'e-mch-db' // app database name
});
connection.connect();
/*
var mqtt = require('mqtt')
, client = mqtt.connect();
client.subscribe('iot-2/evt/status/fmt/json');
*/
/* GET MQTT Data. */
//	http://localhost:3000/getMqttData?uri=aaaa::c30c:0:0:4
router.get('/', function(req, res, next) {
	var mote_uri = req.query.uri;
	var duration_sec = req.query.d;
	var n_hops = req.query.h;
    // MQTT_0.5Sec_3Hop
	var Protocol = 'MQTT_'+ duration_sec +'Sec_'+ n_hops +'Hop';
	var start = new Date();
	/*
	client.on('message', function(topic, payload) {
		var RTT = new Date() - start;
		start = new Date();
		//console.info("Execution time: %dms", RTT);
		m_payload = decoder.write(payload);
		//client.end();
		console.log(m_payload);
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
	      /*connection.query('INSERT INTO `emch-tbl` (MessageID, UpTime, ClockTime, Temperature, Battery, Protocol, RTT, PowTrace) VALUES (\''+MessageID+'\',\''+UpTime+'\', \''+ClockTime+'\', \''+Temperature+'\', \''+Battery+'\', \''+Protocol+'\', \''+RTT+'\', \''+PowTrace+'\')', function(err, rows, fields) {
	      	if (err) throw err;
	      });

	client.on('error', function(error) {
	request_counter = request_counter + 1;
    console.log("################### " + request_counter + " ###################\n");
    console.log(error);
    console.log("######################################\n");
    return;
	})

	}); */
res.send(m_payload);
});

module.exports = router;