var express = require('express')

var router = express.Router()
var userapi = require('./api/user.route')
var stockapi = require('./api/stock.route')


router.use('/stocks', stockapi);
router.use('/users', userapi);

module.exports = router;