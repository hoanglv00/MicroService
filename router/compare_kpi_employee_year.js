var express = require('express');
var router = express.Router();
var compareYear = require('../controller/compare_kpi_employee_year');
var check = require('../utils/check_valid_input');

router.get('/compare', check.isYear, compareYear.compareKPIEmployeeByYear);

router.get('/getlist', compareYear.getListKPIEmployeeByYear);

module.exports = router;
