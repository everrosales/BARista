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

ws = new WebSocket('ws://' + window.location.hostname + ':1234', 'echo-protocol');
console.log(ws);

var orderMix = function(e) {
  var mix = e.value;
  var name = document.getElementById('name').value;
  // TODO(everrosales): Check that mix is a number 1, 2, 3, 4, 5

  // Create the mix object
  var mixObject = {
    type: 'mix',
    recipe: drinkMap[mix],
    amount: 1,
    name: name
  };

  // JSON stringify!!!
  var jsonString = JSON.stringify(mixObject);
  // Sanity check to be removed
  console.log(jsonString);
  ws.send(jsonString);
};

var orderCustomMix = function(e) {
  // Make a custom drink order
  // 1) fetch the different proportions of the various types of drinks
  // 2) Create a custom recipe like with the drink map
  // 3) create a mixObject
  // 4) JSON.stringify(mixObject)
  // 5) send the order via websocket (ws.send(jsonString))
}

var sendMessage = function() {
  var message = $('#message')[0].value;
  console.log(message);
  ws.send(message);
  console.log('sent message');
}

var updateOrderQueue = function(status, id, name) {
  var name = name || 'Anonymous';
  var drinkQueue = document.getElementById('drinkQueue');
  console.log('updating orders');
  if (status == 'Clear') {
    document.getElementById(id).remove();
  } else if (document.getElementById(id)) {
    document.getElementById(id).innerHTML = name + '-' + status;
  } else {
    drinkQueue.innerHTML += '<li id=' + id + '>' + name + ' - ' + status + '</li>';
  }
}

ws.addEventListener('message', function(e) {
  var msg = e.data;
  msg = JSON.parse(msg);

  console.log(msg);
  if (!msg.type) {
    // Something went wrong
    x = msg;
    console.log('Err: ' + msg);
    return;
  } else if (msg.type == 'chat') {

  } else if (msg.type == 'order') {
    updateOrderQueue(msg.status, msg.id, msg.name);
  }
  document.getElementById('chatlog').innerHTML += '<br>' + msg;


});
