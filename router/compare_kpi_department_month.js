var express = require('express');
var router = express.Router();
var compareMonth = require('../controller/compare_kpi_department_month');
var check = require('../utils/check_valid_input');

router.get('/compare', check.isMonth, check.isYear, compareMonth.compareKPIDepartmentByMonth);

router.get('/getlist', compareMonth.getListKPIDepartmentByMonth);

router.get('/getPercent', compareMonth.getKPIPerTagertByMonth);

module.exports = router;
