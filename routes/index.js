var express = require('express');
var router = express.Router();

var getDateStr = function() {
    var date = new Date();
    var dateStr = date.toLocaleString("en-us",
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return dateStr;
};

router.get('/results', function(req, res, next) {
  res.render('results', {});
});

/* GET home page. */
router.get('/', function(req, res, next) {
    var dateStr = getDateStr();
    res.render('index', { date: dateStr });
});


module.exports = router;
