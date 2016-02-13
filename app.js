var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var readline = require('readline');
var logger = require('morgan');

var index = require('./routes/index');a

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/gmail', gmail);
var WebSocketServer = require('websocket').server;
wsServer = new WebSocketServer({
  httpServer: server
});

wsServer.on('request', function(r) {
  var connection = r.accept('echo-protocol', r.origin);
  var count = 0;
  var clients = {};
  var id = count++;
  clients[id] = connection;
  console.log((new Date()) + ' Connection accepted [' + id + ']');
  connection.on('message', function(message) {
    var msgString = message.utf8Data;

    console.log('Recieved msg: ' + msgString + ', by client: ' + id);
  });
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
