var express = require('express');
var router = express.Router();

router.ws('/echo', function(ws, req) {
	console.error('websocket connection');
	for (var t = 0; t < 3; t++){
		setTimeout(() => ws.send('message from server', ()=>{}), 3000*t);	
	}

        ws.on('message', function(msg) {
                console.log(msg);
        });
});
 

module.exports = router;
