/**
 * MySQL Connection Module.
 * wirtten and placed in created 'config' directory by Kaleem Ullah
 */

// create MYSQL Server connection to store data
var mysql      = require('mysql');
var connection = mysql.createConnection({
			host     : 'localhost', 	// default-localhost
			user     : 'root',  			// default-root-user
			password : '',  					// default-no-password
			database : 'e-mch-db' 		// app database name
});
connection.connect(function(err) {
    if (err) throw err;
});

// export this module for importing in routes
module.exports = connection;