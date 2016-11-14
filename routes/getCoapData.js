var express     = require('express');
var session  	= require('../config/ping'); // include ping configs && path must be relative to file you're in
var connection  = require('../config/dbcon'); // include mysql connection object && path must be relative to file you're in
var decoder  	= require('../config/decoder');
var coap  		= require('../config/coap-connector');
var router     	= express.Router();
var mote_uri    = 'aaaa::c30c:0:0:2';

// variables
var MessageID   = "nil";
var UpTime      = "nil";
var ClockTime   = "nil";
var Temperature = "nil";
var Battery     = "nil";
var PowTrace    = "nil";
var RTT         = "nil";

var mote_uri    = "nil";
var duration_sec= "nil";
var n_hops      = "nil";
var Protocol	= "nil";

var request_counter = 1;

/* GET CoAP Data. */
//	http://localhost:3000/getCoapData?uri=aaaa::c30c:0:0:2
router.get('/', function(req, res, next) {
	mote_uri    = req.query.uri;
	duration_sec= req.query.d;
	n_hops      = req.query.h;
	// CoAP_0.5Sec_3Hop
	Protocol= 'CoAP_'+ duration_sec +'Sec_'+ n_hops +'Hop';
	/*-------------------- get Round Trip Time ---------------------*/
	session.pingHost (mote_uri, function (rtt_error, mote_uri, sent, rcvd) {
		RTT = rcvd - sent;
		//console.log ("Target " + mote_uri + ": RTT (ms=" + RTT + ")");

		if(!rtt_error){
		/*-------------------- get Payload ---------------------*/

			var c_req   = coap.request('coap://[' + mote_uri + ']:5683/sens/mote')
			c_req.on('response', function(c_res) {
			//console.info("RTT: %dms", RTT);
			if (!c_res.payload){
				return;	
			}
			c_payload   = decoder.write(c_res.payload);
			//  populate database
			//  MessageID, UpTime, ClockTime, Temperature, Battery, PowTrace  //<-- This
			var string  = "";

			string      = String(c_payload);
			string      = string.split(",");
			MessageID   = (string[0]) ? string[0] : '0' ;
			UpTime      = (string[1]) ? string[1] : '0' ;
			ClockTime   = (string[2]) ? string[2] : '0' ;
			Temperature = (string[3]) ? string[3] : '0' ;
			Battery     = (string[4]) ? string[4] : '0' ;
			PowTrace    = (string[5]) ? string[5] : '0' ;
			connection.query('INSERT INTO `emch-tbl` (MessageID, UpTime, ClockTime, Temperature, Battery, Protocol, RTT, PowTrace) VALUES (\''+MessageID+'\',\''+UpTime+'\', \''+ClockTime+'\', \''+Temperature+'\', \''+Battery+'\', \''+Protocol+'\', \''+RTT+'\', \''+PowTrace+'\')', function(err, rows, fields) {
				if (err) throw err;
			});
			console.log("Data received  " + c_payload + "\n")
			res.send(c_payload + "," + RTT);
			})
			c_req.on('error', function(c_res) {
				request_counter = request_counter + 1;
				console.log("[===============< CoAP: " + request_counter + " >===============]\n");
				console.log(c_res);
				console.log("[==================================]\n");
				return;
			})
			c_req.end()

		/*-------------------- End get Payload ---------------------*/
		}else{
			console.log("CoAP: Ping failed, Device is not reachable, Trying again ... \n");
		return;	// No RTT
		}

});
	/*-------------------- End get Round Trip Time ---------------------*/
});

module.exports = router;