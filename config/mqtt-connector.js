/**
 * mqtt-connector Module.
 * wirtten and placed in created 'config' directory by Kaleem Ullah
 */

/*-------------------- mqtt-connector Lib Configs ---------------------*/
// require mqtt library
var mqtt 			= require('mqtt')
, client 			= mqtt.connect();

client.subscribe('iot-2/evt/status/fmt/json', function(){/* console.log("Event: subscribed on topic"); */});
/*-------------------- mqtt-connector PING Lib Configs ------------------*/
// export this module for importing in routes
module.exports = client;