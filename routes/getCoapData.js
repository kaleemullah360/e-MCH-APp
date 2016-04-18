var express = require('express');
var router = express.Router();
var mote_uri = 'aaaa::c30c:0:0:2';
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

// create MYSQL Server connection to store data
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost', // default
  user     : 'root',  // default
  password : '',  // default
  database : 'e-mch' // app database name
});
connection.connect();

var coap        = require('coap')

/* GET CoAP Data. */
//	http://localhost:3000/getCoapData?uri=aaaa::c30c:0:0:2
router.get('/', function(req, res, next) {
	var mote_uri = req.query.uri;
	var req = coap.request('coap://[' + mote_uri + ']:5683/sens/mote')
	req.on('response', function(c_res) {
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
	      var Protocol = "CoAP";
	      connection.query('INSERT INTO `e-mch-table` (MessageID, UpTime, ClockTime, Temperature, Battery, Protocol, PowTrace) VALUES (\''+MessageID+'\',\''+UpTime+'\', \''+ClockTime+'\', \''+Temperature+'\', \''+Battery+'\', \''+Protocol+'\', \''+PowTrace+'\')', function(err, rows, fields) {
	      	if (err) throw err;
	      });

		res.send(decoder.write(c_payload));
	})
	req.end()
});

module.exports = router;
