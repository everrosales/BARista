window.setInterval(function() {

}, 60000)
$('#orderDrink').click(function() {
  console.log('order me a drink minion');
});

$('#pingButton').click(function() {
  console.log('clicking ping');
  sendMessage();
  $('#message').innerHTML = "";
})

ws = new WebSocket('ws://18.111.63.105:1234', 'echo-protocol');
console.log(ws);

var sendMessage = function() {
  var message = $('#message')[0].value;
  console.log(message);
  ws.send(message);
  console.log('sent message');

}

ws.addEventListener('message', function(e) {
  var msg = e.data;
  document.getElementById('chatlog').innerHTML += '<br>' + msg;
});
