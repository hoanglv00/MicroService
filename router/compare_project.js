var express = require('express');
var router = express.Router();
var compare = require('../controller/compare-project');

router.get('/compareEmployee', compare.compareTwoEmployeeInProject);

//router.get('/getlist', compareYear.getListKPIDepartmentByYear);

module.exports = router;
