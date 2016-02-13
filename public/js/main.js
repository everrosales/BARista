window.setInterval(function() {

}, 60000)

var drinkMap = {
  '1': {'a': 0.5, 'b': 0.5, 'c': 0,'d': 0, 'e': 0},
  '2': {'a': 0.5, 'b': 0.5, 'c': 0,'d': 0, 'e': 0},
  '3': {'a': 0.5, 'b': 0.5, 'c': 0,'d': 0, 'e': 0},
  '4': {'a': 0.5, 'b': 0.5, 'c': 0,'d': 0, 'e': 0},
  '5': {'a': 0, 'b': 0, 'c': 0,'d': 0, 'e': 1}
}

$('#orderDrink').click(function() {
  console.log('order me a drink minion');
});

$('#pingButton').click(function() {
  console.log('clicking ping');
  sendMessage();
  $('#message').innerHTML = "";
});

ws = new WebSocket('ws://18.111.63.105:1234', 'echo-protocol');
console.log(ws);

var orderMix = function(e) {
  var mix = e.value;
  // Check that mix is a number 1, 2, 3, 4, 5

  var mixObject = {
    recipe: drinkMap[mix],
    amount: 1
  };

  var jsonString = JSON.stringify(mixObject);
  console.log(jsonString);
  ws.send(jsonString);
};

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
