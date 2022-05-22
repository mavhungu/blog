var express = require('express');
var router = express.Router();
const {login} = require('../controllers/indexController');

/* GET home page. */
router.route('/').get(login)

router.route('/singout').get()

module.exports = router;
