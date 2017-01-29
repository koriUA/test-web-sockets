var express = require('express');
var router = express.Router();
var ConnectionsService = require('../services/connections.service.js');



router.ws('/echo', function(ws, req) {

	var access_token = ConnectionsService.getToken(ws, req);
	
	ConnectionsService.connections[access_token] = {
		ws: ws
	};
	ConnectionsService.sendToAll({
		connections: ConnectionsService.getAllUsersByConnections()
	});

    ws.on('message', function(message) {
		ConnectionsService.sendToAll({
			message: message
		});
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