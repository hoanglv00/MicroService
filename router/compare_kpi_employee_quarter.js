var express = require('express');
var router = express.Router();
var compareQuarter = require('../controller/compare_kpi_employee_quarter');
var check = require('../utils/check_valid_input');

router.get('/compare', check.isQuarter, check.isYear, compareQuarter.compareKPIEmployeeByQuarter);

//router.get('/getlist', compareQuarter.getListKPIEmployeeByQuarter);

module.exports = router;
