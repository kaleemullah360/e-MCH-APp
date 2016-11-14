/**
 * coap-connector Module.
 * wirtten and placed in created 'config' directory by Kaleem Ullah
 */

// ICMPV6 compatible settings to find rtt
var ping = require ("net-ping");
var session = ping.createSession (options);

/*-------------------- PING Lib Configs ---------------------*/
// Default options
var options = {
  networkProtocol: ping.NetworkProtocol.IPv6,
  packetSize: 64,
  retries: 1,
  sessionId: (process.pid % 65535),
  timeout: 10000,
  ttl: 128
};
var session = ping.createSession (options);

session.on ("error", function (error) {
  console.trace (error.toString ());
});
/*-------------------- End PING Lib Configs ------------------*/
// export this module for importing in routes
module.exports = session;