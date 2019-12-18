const express = require('express');
const router = express.Router();
var hello = require('../controller/hello');
var get = require('../controller/utils/getListEmployeeFromDepartment');
var kpi = require('../controller/statistic_depart');

router.get('/hello', hello.hellox);
router.get('/kpi', kpi.getKPIEmployeeInDepart);
router.get('/kpi-percent', kpi.getPercentKPIEmployeeInDepart);
router.get('/kpi-compare', kpi.compareKPIEmployeeInDepart);

module.exports = router;
