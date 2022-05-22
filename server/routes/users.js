var express = require('express');
var router = express.Router();
const {home} = require('../controllers/usersController')

/* GET users listing. */
router.route('/').get(home)

module.exports = router;
