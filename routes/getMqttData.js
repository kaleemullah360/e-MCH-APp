var express 	= require('express');
var session  	= require('../config/ping'); // include ping configs && path must be relative to file you're in
var connection  = require('../config/dbcon'); // include mysql connection object && path must be relative to file you're in
var decoder  	= require('../config/decoder');
var client  	= require('../config/mqtt-connector');
var router 		= express.Router();
var mote_uri 	= 'aaaa::c30c:0:0:2';

// variables
var MessageID   = "nil";
var UpTime      = "nil";
var ClockTime   = "nil";
var Temperature = "nil";
var Battery     = "nil";
var PowTrace    = "nil";
var RTT         = "nil";
var PrevMsgID	= "nil";

var mote_uri 	= "nil";
var node_id 	= "nil";
var duration_sec= "nil";
var n_hops 		= "nil";
var Protocol	= "nil";
var request_counter = 1;

m_payload 		= "";

//console.log(client);
/* GET MQTT Data. */
//	http://localhost:3000/getMqttData?uri=aaaa::c30c:0:0:2
router.get('/', function(req, res, next) {

	if(node_id == "nil"){
		mote_uri= req.query.uri;
		node_id = mote_uri.substr(-1);
		client.subscribe("emch/mqtt/server/" + node_id, function(){
			console.log("Event: Subscribed on topic: " + "emch/mqtt/server/" + node_id); 
		});
		// some topics
		// emch/mqtt/server/2
		// emch/mqtt/server/3
		// emch/mqtt/server/4
		// emch/mqtt/hop/a
		// emch/mqtt/hop/b
		// emch/mqtt/hop/c
	}

	duration_sec= req.query.d;
	n_hops 		= req.query.h;


    // MQTT_0.5Sec_3Hop
    Protocol = 'MQTT_'+ duration_sec +'Sec_'+ n_hops +'Hop';

    	/*-------------------- get Payload ---------------------*/  

    client.on('message', function(topic, payload) {
    	m_payload	= decoder.write(payload);
		//  populate database
		//  MessageID, UpTime, ClockTime, Temperature, Battery, PowTrace  //<-- This
		var string 	= "";
		string 		=	String(m_payload);
		string 		= string.split(",");
		MessageID   = (string[0]) ? string[0] : '0' ;
		if(MessageID != PrevMsgID){	// savd this record only if its new request

			/*-------------------- get Round Trip Time ---------------------*/
			session.pingHost (mote_uri, function (rtt_error, mote_uri, sent, rcvd) {

			    if(!rtt_error){
					RTT = rcvd - sent;
					//console.log ("Target " + mote_uri + ": RTT (ms=" + RTT + ")");
					UpTime      = (string[1]) ? string[1] : '0' ;
					ClockTime   = (string[2]) ? string[2] : '0' ;
					Temperature = (string[3]) ? string[3] : '0' ;
					Battery     = (string[4]) ? string[4] : '0' ;
					PowTrace    = (string[5]) ? string[5] : '0' ;
					connection.query('INSERT INTO `emch-tbl` (MessageID, UpTime, ClockTime, Temperature, Battery, Protocol, RTT, PowTrace) VALUES (\''+MessageID+'\',\''+UpTime+'\', \''+ClockTime+'\', \''+Temperature+'\', \''+Battery+'\', \''+Protocol+'\', \''+RTT+'\', \''+PowTrace+'\')', function(err, rows, fields) {
						if (err) throw err;
					});
					
					PrevMsgID 	= MessageID;
				}else{
					console.log("MQTT: Ping failed, Device is not reachable, Trying again ... \n");
			        return;	// No RTT
			    }
			});
			/*-------------------- End get Round Trip Time ---------------------*/
		}

	})

	client.on('error', function(error) {
		request_counter = request_counter + 1;
		console.log("[===============< MQTT: " + request_counter + " >===============]\n");
		console.log(error);
		console.log("[==================================]\n");
		return;
	})

	// client.end('', function(){console.log("Event: Ended with Acknowledgement sent");});
	// client.unsubscribe('iot-2/evt/status/fmt/json', function(){console.log("Event: un-subscribed on topic");});

    console.log("Data received  " + m_payload + "\n")
    res.send(m_payload + "," + RTT);

    /*-------------------- End get Payload ---------------------*/

});

module.exports = router;