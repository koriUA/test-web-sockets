var mysql = require('mysql');
var config = require('../config/database.json');

module.exports = {

	test: function(cb){		//https://github.com/mysqljs/mysql?_ga=1.64242287.1902638875.1478593425
		var connection = mysql.createConnection({
		  host: config.dev.host,
		  database: config.dev.database,
		  user: config.dev.user,
		  password: config.dev.password
		});

		connection.connect(function(err) {
			if (err) {
		    	console.error('error connecting: ' + err.stack);
		    	cb(err);
			}
		});

		connection.query('SHOW TABLES;', function (err, results, fields) {
		  if (err) {
		  	cb(err);
		  }
		  cb(null, {result: results});
		});

		connection.end();
	}

	
}