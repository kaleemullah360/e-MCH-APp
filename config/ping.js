/**
 * net-ping Module.
 * wirtten and placed in created 'config' directory by Kaleem Ullah
 */

// ICMPV6 compatible settings to find rtt
var ping = require ("net-ping");
var session = ping.createSession (options);

session.on ("error", function (error) {
  console.trace (error.toString ());
});

// export this module for importing in routes
module.exports = connection;