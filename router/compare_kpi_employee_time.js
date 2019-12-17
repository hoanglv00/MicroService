var express = require('express');
var router = express.Router();
var compareTime = require('../controller/compare_kpi_employee_time');
var compareYear = require('../controller/compare_kpi_employee_year');
var check = require('../utils/check_valid_input');

router.get('/compare', check.isTimeBodyEmp, compareTime.compareKPIEmployeeByTime);

router.get('/compare-one', check.isYear, compareYear.compareKPIOnlyEmployeeByYear);

router.get('/getlist', compareTime.getListKPIEmployeeByTime);

module.exports = router;
