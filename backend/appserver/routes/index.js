var express = require('express');
var router = express.Router();
var api="https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=demo";
var stockerController= require('../controller/stocker.controller');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


router.get('/body', stockerController.getStockValues);


