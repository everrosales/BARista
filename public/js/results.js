ws = new WebSocket('ws://localhost'  + ':3001', 'echo-protocol');
console.log(ws);

var chartData = [
  ['Drink', 'Percentage'],
  ["Drink 1", 0],
  ["Drink 2", 0],
  ["Drink 3", 0],
  ["Drink 4", 0]
];

google.charts.load('current', {'packages': ['corechart']});
// google.charts.setOnLoadCallback(drawChart(chartData));

function drawChart(chartData) {
  var data = google.visualization.arrayToDataTable(chartData);

  var options = {
    title: "Twitch Vote Percentages"
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}

ws.onmessage = function(event) {
  var msg = JSON.parse(event.data);
  console.log(msg);
  var chartData = [
    ['Drink', 'Percentage'],
    ["Drink 1", msg[0]],
    ["Drink 2", msg[1]],
    ["Drink 3", msg[2]],
    ["Drink 4", msg[3]]
  ];
  // for (var i; i < msg.length; i++) {
  //   chartData[i + 1][1] = msg[i];
  // }
  console.log(chartData);
  drawChart(chartData);
}
