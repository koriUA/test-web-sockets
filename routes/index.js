var express = require('express');
var router = express.Router();

var connections = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.ws('/echo', function(ws, req) {
	console.error('websocket connection open');
	connections.push(ws);

    ws.on('message', function(msg) {
    	connections.forEach(function(c){
			c.send(msg); // Send the new text to all open connections
		});
    });

    ws.on('close', function(msg) {
		console.error('websocket connection close');
		var index = connections.indexOf(ws);
        if (index > -1) {	/* remove connection */
            connections.splice(index, 1);
        }
    });
});

module.exports = router;