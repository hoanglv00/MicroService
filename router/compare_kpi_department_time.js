var express = require('express');
var router = express.Router();
var compareTime = require('../controller/compare_kpi_department_time');
var compareOne = require('../controller/compare_kpi_department_year');
var check = require('../utils/check_valid_input');

router.get('/compare', check.isTimeBody, compareTime.compareKPIDepartmentByTime);

router.get('/compare-one', check.isYear, compareOne.compareKPIOnlyDepartmentByYear);

router.get('/getlist', compareTime.getListKPIDepartmentByTime);

module.exports = router;
