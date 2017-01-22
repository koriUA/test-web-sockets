#!/usr/bin/env node

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var debug = require('debug')('westernapp:server');
var http = require('http');
var port = normalizePort(process.env.PORT || '3000');

var app = express();
app.set('port', port);
console.log('listen ', port);

var server = http.createServer(app);
var expressWs = require('express-ws')(app, server);

server.listen(port);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
s
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));  //share node_modules with front-end;
app.use('/', require('./routes/index'));

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}