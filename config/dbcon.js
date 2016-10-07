// create MYSQL Server connection to store data
var mysql      = require('mysql');
var connection = mysql.createConnection({
host     : 'localhost', // default
user     : 'root',  // default
password : '',  // default
database : 'e-mch-db' // app database name
});
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;