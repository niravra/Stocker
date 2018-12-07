var express = require('express')

var router = express.Router()


var stockController = require('../../controller/stocker.controller');



router.get('/stockPrices',stockController.getStockValues);
router.get('/cryptoPrices',stockController.getCryptoValues);


router.get('/testAMZNPrices',stockController.getStockValuesOfAmzn);

router.get('/stockWeeklyPrices',stockController.getWeeklyStockValues);
router.get('/stockMonthlyPrices',stockController.getMonthlyStockValues);
router.get('/stockDailyPrices',stockController.getDailyStockValues);
router.get('/stockIntradayPrices',stockController.getIntradayStockValues);


router.get('/cryptoIntradayPrices',stockController.getIntradayCryptoValues);
router.get('/cryptoDailyPrices',stockController.getDailyCryptoValues);
router.get('/cryptoWeeklyPrices',stockController.getWeeklyCryptoValues);
router.get('/cryptoMonthlyPrices',stockController.getMonthlyCryptoValues);


router.get('/currentTime',stockController.currentTime);
router.get('/stockHome',stockController.getDefaultStockValues)



//router.get('/stockMonthlyPrices',stockController.getMonthlyStockValues);

module.exports = router;