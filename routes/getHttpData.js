var express 	= require('express');
var session  	= require('../config/ping'); // include ping configs && path must be relative to file you're in
var connection  = require('../config/dbcon'); // include mysql connection object && path must be relative to file you're in
var decoder  	= require('../config/decoder');
var request  	= require('../config/http-connector');
var router 		= express.Router();
var mote_uri 	= 'aaaa::c30c:0:0:3';

// variables
var MessageID   = "nil";
var UpTime      = "nil";
var ClockTime   = "nil";
var Temperature = "nil";
var Battery     = "nil";
var PowTrace    = "nil";
var RTT         = "nil";
var mote_uri 	= "nil";
var duration_sec= "nil";
var n_hops 		= "nil";
var Protocol	= "nil";
var request_counter = 1;

/* GET HTTP Data. */
//	http://localhost:3000/getHttpData?uri=aaaa::c30c:0:0:3
router.get('/', function(req, res, next) {
	mote_uri 		= req.query.uri;
	duration_sec 	= req.query.d;
	n_hops 			= req.query.h;
	// HTTP_0.5Sec_3Hop
	Protocol = 'HTTP_'+ duration_sec +'Sec_'+ n_hops +'Hop';

	/*-------------------- get Payload ---------------------*/
request('http://['+mote_uri+']', function (request_error, response, payload) {

	if (request_error) {
		request_counter = request_counter + 1;
		console.log("[===============< HTTP: " + request_counter + " >===============]\n");
		console.log(request_error);
		console.log("[==================================]\n");
		return;
	}

	if (payload) {

	/*-------------------- get Round Trip Time ---------------------*/
	session.pingHost (mote_uri, function (rtt_error, mote_uri, sent, rcvd) {

		if(!rtt_error){
			RTT = rcvd - sent;
			//console.log ("Target " + mote_uri + ": RTT (ms=" + RTT + ")");
			h_payload 	= decoder.write(payload);
			//  populate database
			//  MessageID, UpTime, ClockTime, Temperature, Battery, PowTrace  //<-- This
			var string 	= "";
			string 		=	String(h_payload);
			string 		= string.split(",");
			MessageID   = (string[0]) ? string[0] : '0' ;
			UpTime      = (string[1]) ? string[1] : '0' ;
			ClockTime   = (string[2]) ? string[2] : '0' ;
			Temperature = (string[3]) ? string[3] : '0' ;
			Battery     = (string[4]) ? string[4] : '0' ;
			PowTrace    = (string[5]) ? string[5] : '0' ;
			connection.query('INSERT INTO `emch-tbl` (MessageID, UpTime, ClockTime, Temperature, Battery, Protocol, RTT, PowTrace) VALUES (\''+MessageID+'\',\''+UpTime+'\', \''+ClockTime+'\', \''+Temperature+'\', \''+Battery+'\', \''+Protocol+'\', \''+RTT+'\', \''+PowTrace+'\')', function(err, rows, fields) {
			if (err) throw err;
			});
			console.log("Data received  " + h_payload + "\n")
			res.send(h_payload + "," + RTT);
		}else{
			console.log("HTTP: Ping failed, Device is not reachable, Trying again ... \n");
		return; // No RTT
		}
	});
		/*-------------------- End get Round Trip Time ---------------------*/

	}else{return}
})

/*-------------------- End get Payload ---------------------*/

});

module.exports = router;