var express = require('express');
var router = express.Router();
var compareYear = require('../controller/compare_kpi_department_year');
var check = require('../utils/check_valid_input');

router.get('/compare', check.isYear, compareYear.compareKPIDepartmentByYear);

router.get('/getlist', compareYear.getListKPIDepartmentByYear);

module.exports = router;
