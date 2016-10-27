var app = require('express')();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);

app.get('/', function(req, res) {  
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {  
    socket.emit('announcements', { message: 'A new user has joined!' });
});

server.listen(8080);  