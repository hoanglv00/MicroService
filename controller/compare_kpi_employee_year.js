const rp = require('request-promise');
const lodash = require('lodash');
const fetch = require('node-fetch');
const axios = require('axios');
const moment = require('moment');

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function parseJSON(response) {
    // var a = await response.json()
    // console.log(a)
    return response.json()
    
}

function parseJSONWithPromise(response) {
    return Promise.resolve(response.json());
}

function orderByDes(response) {
    return Promise.resolve(
        lodash.orderBy(response.data, 'kpiValue', 'desc')
    );
}

function getKPIFromArrayResponse(array) {
    console.log(array); 
    return array.map(value => {
        //var util = require('util');
        //console.log(util.inspect(value, { showHidden: true, depth: null }));
        var total;
        var KPIProject = value.data.KPI.projects;
        console.log(KPIProject.length); 
        var KPITasks = value.data.KPI.tasks;
        console.log(KPITasks.length); 
        if (Array.isArray(KPIProject) && KPIProject.length > 0 ){
            var arrayP = KPIProject.map(x => {return x.KPI});
            if (Array.isArray(KPITasks) && KPITasks.length > 0){
                var arrayT = KPITasks.map(y => {return y.KPI});
                total = lodash.sum(arrayP) + lodash.sum(arrayT);
            }
            else
                total = lodash.sum(arrayP)
        }
        else{
            if (Array.isArray(KPITasks) && KPITasks.length > 0){
                var arrayT = KPITasks.map(y => {return y.KPI});
                total = lodash.sum(arrayT);
            }
            else
                total = 0;
        }
        var final = {};
        final.kpiValue = total;
        final.employeeId = value.data.id;
        final.startTime = value.data.from;
        final.endTime = value.data.to;
        return final;
    }
    );
}

function setUrlForCompare(req) {
    var yearAndMonthStart = req.query.year + '01';
    var yearAndMonthEnd = req.query.year + '12';
    var endOfMonth = moment(yearAndMonthEnd, "YYYYMM").daysInMonth()
    var params = {
        from: yearAndMonthStart + '01',
        to: yearAndMonthEnd + endOfMonth
    };

    return query = Object.keys(params)
        .map(k => k + '=' + params[k])
        .join('&');
}

function setUrlForCompareOnlyEmp(req, month) {
    var yearAndMonth = req.query.year + month;
    var endOfMonth = moment(yearAndMonth, "YYYYMM").daysInMonth()
    var params = {
        from: yearAndMonth + '01',
        to: yearAndMonth + endOfMonth
    };

    return query = Object.keys(params)
        .map(k => k + '=' + params[k])
        .join('&');
}

function setUrlForGetList(req) {
    var params = {
        monthNumber: req.query.monthNumber,
        year: req.query.year
    };

    return query = Object.keys(params)
        .map(k => k + '=' + params[k])
        .join('&');
}

function compareKPIEmployeeByYear(req, res, next) {
    var employeeKPI = 'http://calm-basin-00803.herokuapp.com/api/v1/users/get/';
    var employees = req.query.employee;
    var urls = employees.map(id => employeeKPI + id + '?' + setUrlForCompare(req));
    Promise.all(urls.map(url =>
        //console.log(url);
        fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            //.then(response => { return response.data })
            .catch(error => console.log('There was a problem!', error))
    
    ))
        .then(data => {
            res.status(200)
                .json({
                    status: 'success',
                    //data: getKPIFromArrayResponse(data)
                    data: lodash.orderBy(getKPIFromArrayResponse(data), 'kpiValue', req.query.criteria)
                });
        })
}

function compareKPIOnlyEmployeeByYear(req, res, next) {
    var employeeKPI = 'http://calm-basin-00803.herokuapp.com/api/v1/users/get/';
    var employee = req.query.employee;
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var urls = months.map(month => employeeKPI + employee + '?' + setUrlForCompareOnlyEmp(req, month));
    Promise.all(urls.map(url =>
        //console.log(url);
        fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            //.then(response => { return response.data })
            .catch(error => console.log('There was a problem!', error))
    
    ))
        .then(data => {
            res.status(200)
                .json({
                    status: 'success',
                    //data: getKPIFromArrayResponse(data)
                    data: lodash.orderBy(getKPIFromArrayResponse(data), 'kpiValue', req.query.criteria)
                });
        })
}

function getListKPIEmployeeByYear(req, res, next) {
    // var url = 'http://18.191.133.197:8083/api/v1/departmentKPI/getDepartmentKPI' + setUrlForGetList(req);
    // console.log('console');
    // fetch(url)
    //     .then(checkStatus)
    //     .then(parseJSONWithPromise)
    //     .then(orderByDes)
    //     .then(data => {
    //         console.log()
    //         res.status(200)
    //             .json({
    //                 status: 'success',
    //                 data: data
    //             });
    //     }
    //     )
    //     .catch(error => console.log('There was a problem!', error))
    res.status(200)
        .json({
            "status": "success",
            "data": [
                {
                    "kpiValue": 1.16,
                    "employeeId": 1,
                    "startTime": "2019-10-01 00:00:00",
                    "endTime": "2019-11-01 00:00:00"
                },
                {
                    "kpiValue": 1.16,
                    "employeeId": 5,
                    "startTime": "2019-10-01 00:00:00",
                    "endTime": "2019-11-01 00:00:00"
                },
                {
                    "kpiValue": 0.96,
                    "employeeId": 4,
                    "startTime": "2019-10-01 00:00:00",
                    "endTime": "2019-11-01 00:00:00"
                },
                {
                    "kpiValue": 0.58,
                    "employeeId": 3,
                    "startTime": "2019-10-01 00:00:00",
                    "endTime": "2019-11-01 00:00:00"
                },
                {
                    "kpiValue": 0.18,
                    "employeeId": 2,
                    "startTime": "2019-10-01 00:00:00",
                    "endTime": "2019-11-01 00:00:00"
                }
            ]
        });
}

module.exports = {
    compareKPIEmployeeByYear: compareKPIEmployeeByYear,
    getListKPIEmployeeByYear: getListKPIEmployeeByYear,
    compareKPIOnlyEmployeeByYear:compareKPIOnlyEmployeeByYear
}

