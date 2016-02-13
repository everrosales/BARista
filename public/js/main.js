window.setInterval(function() {

}, 60000)
$('#orderDrink').click(function() {
  console.log('order me a drink minion');
})


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

})
