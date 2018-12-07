var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var userController = require('../../controller/user.controller');

router.get('/',userController.getallUsers);
router.post('/',userController.createUser);
router.post('/authenticate', userController.authenticateuser);
router.post('/userdata', userController.getuserdata);
router.post('/logout', userController.userlogout);
router.post('/update', userController.userupdate);
router.post('/recent', userController.getsortedusers);
module.exports = router;