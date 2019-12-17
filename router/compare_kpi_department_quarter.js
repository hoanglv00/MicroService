var express = require('express');
var router = express.Router();
var compareQuater = require('../controller/compare_kpi_department_quarter');
var check = require('../utils/check_valid_input');

router.get('/compare', check.isQuarter, check.isYear, compareQuater.compareKPIDepartmentByQuarter);

router.get('/getlist', compareQuater.getListKPIDepartmentByQuater);

module.exports = router;
