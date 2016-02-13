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

/*$('#pingButton').click(function() {
  console.log('clicking ping');
  sendMessage();
  $('#message').innerHTML = "";
});*/

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
    var totalPercentage = percentage1 + percentage2 + percentage3 + percentage4
    if(totalPercentage > 100){
        //Do stuff here
        var difference = totalPercentage - 100;
        while(difference>0){
            var allDrinkNums = [];
            for(var i=1; i < 5; i++){
                if(i != mostRecentDrink && Number($('#drink' + i + 'Percentage').val()) > 0){
                    allDrinkNums.push(i);
                }
            }
            differencePer = difference*1.0/(allDrinkNums.length);
            for(var i=0; i < allDrinkNums.length; i++){
                percent = Number($('#drink' + allDrinkNums[i] + 'Percentage').val());
                if(differencePer > percent){
                    $('#drink' + allDrinkNums[i] + 'Percentage').val(0);
                    difference-=percent;
                }else{
                    $('#drink' + allDrinkNums[i] + 'Percentage').val(percent - differencePer);
                    difference-=differencePer;
                }
            }
        }
    }
    percentage1 = Number($('#drink1Percentage').val());
    percentage2 = Number($('#drink2Percentage').val());
    percentage3 = Number($('#drink3Percentage').val());
    percentage4 = Number($('#drink4Percentage').val());
    totalPercentage = percentage1 + percentage2 + percentage3 + percentage4
    var percentageWater = 100 - (totalPercentage);
    $('#drink1Fill').val(percentage1).css("width", percentage1+"%");
    $('#drink2Fill').val(percentage2).css("width", percentage2+"%");
    $('#drink3Fill').val(percentage3).css("width", percentage3+"%");
    $('#drink4Fill').val(percentage4).css("width", percentage4+"%");
    $('#drink5Fill').val(percentageWater).css("width", percentageWater+"%");
    $('#drink1PercentageShow').text((Math.round(percentage1*100)/100.0) + '%');
    $('#drink2PercentageShow').text((Math.round(percentage2*100)/100.0) + '%');
    $('#drink3PercentageShow').text((Math.round(percentage3*100)/100.0) + '%');
    $('#drink4PercentageShow').text((Math.round(percentage4*100)/100.0) + '%');
    $('#waterPercentage').text('Water Percentage: ' + (Math.round(percentageWater*100)/100.0) + '%');
}

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
  Materialize.toast('Ordering Drink!', 2000)
};

var orderCustomMix = function(e) { 
  var mix = e.value;
  var name = document.getElementById('name').value;
  // TODO(everrosales): Check that mix is a number 1, 2, 3, 4, 5
  var percentage1 = Number($('#drink1Percentage').val())/100.0;
  var percentage2 = Number($('#drink2Percentage').val())/100.0;
  var percentage3 = Number($('#drink3Percentage').val())/100.0;
  var percentage4 = Number($('#drink4Percentage').val())/100.0;
  var totalPercentage = percentage1 + percentage2 + percentage3 + percentage4
  var percentageWater = (1 - (totalPercentage));
  // Create the mix object
  var mixObject = {
    type: 'mix',
    recipe: {'a':percentage1, 'b':percentage2, 'c':percentage3, 'd':percentage4, 'e':percentageWater},
    amount: 1,
    name: name
  };

  // JSON stringify!!!
  var jsonString = JSON.stringify(mixObject);
  // Sanity check to be removed
  console.log(jsonString);
  ws.send(jsonString);
  Materialize.toast('Ordering Drink!', 2000)
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

});
