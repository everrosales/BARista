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

var saveDrinkPercentage = function(drinkNum){
    var percentage = $('#drink' + drinkNum + "Percentage").val();
    percentageBalancer(drinkNum);
}

$('#pingButton').click(function() {
  console.log('clicking ping');
  sendMessage();
  $('#message').innerHTML = "";
});

ws = new WebSocket('ws://' + window.location.hostname + ':1234', 'echo-protocol');
console.log(ws);

function percentageBalancer(mostRecentDrink){
    if($('#drink' + mostRecentDrink + 'Percentage').val() >= 100){
        $('#drink1Percentage').val(0);
        $('#drink2Percentage').val(0);
        $('#drink3Percentage').val(0);
        $('#drink4Percentage').val(0);
        $('#drink' + mostRecentDrink + 'Percentage').val(100);
    }
    var percentage1 = Number($('#drink1Percentage').val());
    var percentage2 = Number($('#drink2Percentage').val());
    var percentage3 = Number($('#drink3Percentage').val());
    var percentage4 = Number($('#drink4Percentage').val());
    var percentageWater = 100 - (percentage1 + percentage2 + percentage3 + percentage4);
    $('#drink1Fill').val(percentage1).css("width", percentage1+"%");
    $('#drink2Fill').val(percentage2).css("width", percentage2+"%");
    $('#drink3Fill').val(percentage3).css("width", percentage3+"%");
    $('#drink4Fill').val(percentage4).css("width", percentage4+"%");
    $('#drink5Fill').val(percentageWater).css("width", percentageWater+"%");
}

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
  Materialize.toast('Ordering Drink!', 2000)
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
