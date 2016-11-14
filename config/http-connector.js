/**
 * http-connector Module.
 * wirtten and placed in created 'config' directory by Kaleem Ullah
 */

/*-------------------- http-connector Lib Configs ---------------------*/
// for making reuest Cross Domain Requests
var request 		= require('request');
/*-------------------- http-connector PING Lib Configs ------------------*/
// export this module for importing in routes
module.exports = request;