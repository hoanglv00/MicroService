var express = require('express');
var router = express.Router();
var compareMonth = require('../controller/compare_kpi_employee_month');
var check = require('../utils/check_valid_input');

router.get('/compare', check.isMonth, check.isYear, compareMonth.compareKPIEmployeeByMonth);

module.exports = router;
