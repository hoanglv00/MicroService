var express = require('express');
var router = express.Router();
var logs = require('../controller/log_controller');
var check = require('../utils/check_valid_input');

router.get('/all', logs.getAllLog);
router.get('/time', check.isTimeQuey, logs.getByTime);
module.exports = router;