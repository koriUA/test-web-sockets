var express = require('express');
var router = express.Router();

var connections = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.ws('/echo', function(ws, req) {

    if (req && req.query && !req.query.access_token){
        var access_token = guid();
        ws.send(JSON.stringify({
            access_token: access_token
        }));
    }

	console.error('websocket connection open');
	connections.push(ws);

    ws.on('message', function(message) {
    	connections.forEach(function(c){
			c.send(JSON.stringify({
                message: message
            })); // Send the new text to all open connections
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



//todo move to service Util;
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}