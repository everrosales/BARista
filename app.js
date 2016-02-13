var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var readline = require('readline');
var logger = require('morgan');
var PythonShell = require('python-shell');

var index = require('./routes/index');
var http = require('http');
var server = http.createServer(function(request, response) {});
server.listen(1234, function() {
  console.log((new Date()) + ' Server is listening on port 1234');
});

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

var count = 0;
var drinkId = 0;
var clients = {};
var drinkQueue = [];

// Python Shell options
var options = {
  scriptPath: 'scripts'
};

var processMsg = function(msgString) {
  parsedMsg = JSON.parse(msgString);
  var newDrink = {};
  if (parsedMsg.type == 'mix') {
    newDrink = {
      name: parsedMsg.name,
      id: drinkId++,
      recipe: parsedMsg.recipe,
      type: 'order',
      status: 'Pending'
    };
    if (drinkQueue.length == 0) {
      drinkQueue.push(newDrink);
      processQueue();
    } else {
      drinkQueue.push(newDrink);
    }
  } else if (parsedMsg.type == 'chat') {
    // Do chat things
  }
  for (var i in clients) {
    clients[i].sendUTF(JSON.stringify(newDrink));
  }
}

var processQueue = function() {
  if (drinkQueue.length == 0) {
    // Queue Empty
    return;
  }
  var topDrink = drinkQueue[0];
  topDrink.status = 'Mixing';
  for (var i in clients) {
      clients[i].sendUTF(JSON.stringify(topDrink));
  }
  // Run Josh's scripts
  PythonShell.run('test.py', {scriptPath: 'scripts'}, function(err, results) {
    if (err) console.log('Sadness: ' + err);
    var processedDrink = topDrink;
    processedDrink.status = "Clear";
    for (var i in clients) {
      clients[i].sendUTF(JSON.stringify(processedDrink));
    }
    drinkQueue.shift();
    processQueue();
  });


  // var processedDrink = topDrink;
  // processedDrink.status = "Clear";
  // window.setTimeout(function() {
  //   for (var i in clients) {
  //     clients[i].sendUTF(JSON.stringify(processedDrink));
  //   }
  // }, 60000);
}

wsServer.on('request', function(r) {
  var connection = r.accept('echo-protocol', r.origin);
  var id = count++;
  clients[id] = connection;
  for (var i = 0; i < drinkQueue.length; i++) {
    connection.sendUTF(JSON.stringify(drinkQueue[i]));
  }
  console.log((new Date()) + ' Connection accepted [' + id + ']');
  connection.on('message', function(message) {
    var msgString = message.utf8Data;

    processMsg(msgString);


    console.log('Recieved msg: ' + msgString + ', by client: ' + id);

  });

  connection.on('close', function(reasonCode, description) {
    delete clients[id];
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + 'disconnected.');
  });
});


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
