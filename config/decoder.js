/**
 * string decoder Module.
 * wirtten and placed in created 'config' directory by Kaleem Ullah
 */

/*-------------------- decoder Lib Configs ---------------------*/
const StringDecoder = require('string_decoder').StringDecoder;
const decoder       = new StringDecoder('utf8');
/*-------------------- End decoder Lib Configs ------------------*/
// export this module for importing in routes
module.exports = decoder;