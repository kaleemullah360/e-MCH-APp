var express = require('express');
var router = express.Router();
var mote_uri = 'aaaa::c30c:0:0:2';
var request_counter = 1;
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
// create MYSQL Server connection to store data
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost', // default
  user     : 'root',  // default
  password : '',  // default
  database : 'e-mch-db' // app database name
});
connection.connect();

var coap        = require('coap')

/* GET CoAP Data. */
//	http://localhost:3000/getCoapData?uri=aaaa::c30c:0:0:2
router.get('/', function(req, res, next) {
	var mote_uri = req.query.uri;
	var duration_sec = req.query.d;
	var n_hops = req.query.h;
    // MQTT_0.5Sec_3Hop
	var Protocol = 'CoAP'+ duration_sec +'Sec_'+ n_hops +'Hop';
	var start = new Date();
	var c_req = coap.request('coap://[' + mote_uri + ']:5683/sens/mote')
	c_req.on('response', function(c_res) {
		var RTT = new Date() - start;
		//console.info("Execution time: %dms", RTT);
		if (!c_res.payload) return;
		c_payload = decoder.write(c_res.payload);
		//  populate database
	      //  MessageID, UpTime, ClockTime, Temperature, Battery, PowTrace  //<-- This
	      var string = "";
	      string =String(c_payload);
	      string = string.split(",");
	      var MessageID = string[0];
	      var UpTime = string[1];
	      var ClockTime = string[2];
	      var Temperature = string[3];
	      var Battery = string[4];
	      var PowTrace = string[5];
	      connection.query('INSERT INTO `emch-tbl` (MessageID, UpTime, ClockTime, Temperature, Battery, Protocol, RTT, PowTrace) VALUES (\''+MessageID+'\',\''+UpTime+'\', \''+ClockTime+'\', \''+Temperature+'\', \''+Battery+'\', \''+Protocol+'\', \''+RTT+'\', \''+PowTrace+'\')', function(err, rows, fields) {
	      	if (err) throw err;
	      });

		res.send(decoder.write(c_payload));
	})
	c_req.on('error', function(c_res) {
	request_counter = request_counter + 1;
    console.log("################### " + request_counter + " ###################\n");
    console.log(c_res);
    console.log("######################################\n");
    return;
	})
	c_req.end()
});

module.exports = router;
