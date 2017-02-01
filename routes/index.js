var express = require('express');
var router = express.Router();
var async = require('async');
var ConnectionsService = require('../services/connections.service.js');
var DatabaseService = require('../services/database.service.js');



router.ws('/echo', function(ws, req) {
	async.auto({
		translations: async.apply(DatabaseService.test.bind(DatabaseService)),
	}, function(err, response){
		console.log('response = ', response);
	})

	var access_token = ConnectionsService.getToken(ws, req);
	
	ConnectionsService.connections[access_token] = {
		ws: ws
	};
	ConnectionsService.sendToAll({
		connections: ConnectionsService.getAllUsersByConnections()
	});

    ws.on('message', function(fromClient) {
    	var dataFromClient = JSON.parse(fromClient);
    	if (dataFromClient.type === 'message'){
	    	ConnectionsService.sendToAll({
				message: dataFromClient.message
			});	
    	}
    });

    ws.on('close', function(msg) {
		ConnectionsService.connections[access_token] = null;
		delete ConnectionsService.connections[access_token];	/* remove connection */
		ConnectionsService.sendToAll({
			connections: ConnectionsService.getAllUsersByConnections()
		});
    });
});

router.get('/*', function(req, res, next) {
  res.render('index');
});

module.exports = router;