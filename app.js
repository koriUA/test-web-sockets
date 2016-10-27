/*var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});*/



var app = require('express')();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);

app.get('/', function(req, res) {  
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080);  