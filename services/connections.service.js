var UtilService = require('../services/util.service.js');

module.exports = {

	connections: {},

	getToken: function(ws, req){
		var access_token;
		if (req && req.query && req.query.access_token && req.query.access_token != 'undefined') {
			access_token = req.query.access_token;
			return access_token;
		}
		access_token = UtilService.guid();
		ws.send(JSON.stringify({
			new_access_token: access_token
		}));
		return access_token;
	},
	
	getAllUsersByConnections: function(){
		var arr = [];
		for (var c in this.connections){
			if (this.connections[c].ws){
				arr.push(c);
			}
		}
		return arr;
	},
	
	sendToAll: function (data){	// Send the new text to all open connections
		for (var c in this.connections){
			if (!this.connections[c].ws){
				return;
			}
			this.connections[c].ws.send(JSON.stringify(data)); 
		}
	}
	
}