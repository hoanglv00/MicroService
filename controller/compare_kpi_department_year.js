const lodash = require('lodash');
const fetch = require('node-fetch');
const moment = require('moment');

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function parseJSON(response) {
    return response.json();
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
    return array.map(value => {
        return value.data;
    }
    );
}

function getKPIAndChangeFromArrayResponse(array) {
    console.log(new Date())   

    return array.map(value => { 
        var data = {
            kpiValue: value.data.kpiValue,  
            departmentId: value.data.departmentId,     
            month: moment(value.data.startTime, "YYYY-MM-DD HH:mm:ss").month() + 1,     
            year: moment(value.data.startTime, "YYYY-MM-DD HH:mm:ss").year()      
        }
        return data;
    }
    );
}

function setUrlForCompare(req) {
    var params = {
        year: req.query.year
    };

    return query = Object.keys(params)
        .map(k => k + '=' + params[k])
        .join('&');
}

function setUrlForGetList(req) {
    var params = {
        year: req.query.year
    };

    return query = Object.keys(params)
        .map(k => k + '=' + params[k])
        .join('&');
}

function compareKPIDepartmentByYear(req, res, next) {
    var departmentKPI = 'http://18.217.21.235:8083/api/v1/departmentKPI/getDepartmentKPIByYear';
    var department = req.query.department;
    var urls = department.map(id => departmentKPI + '?' + 'departmentId=' + id + '&' + setUrlForCompare(req))
    console.log(urls);
    Promise.all(urls.map(url =>
        fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            .catch(error => console.log('There was a problem!', error))
    ))
        .then(data => {
            res.status(200)
                .json({
                    status: 'success',
                    data: lodash.orderBy(getKPIFromArrayResponse(data), 'kpiValue', req.query.criteria)
                });
        })
}

function compareKPIOnlyDepartmentByYear(req, res, next) {
    var departmentKPI = 'http://18.217.21.235:8083/api/v1/departmentKPI/getDepartmentKPIByMonth';
    var months = [1,2,3,4,5,6,7,8,9,10,11,12];
    var department = req.query.department;
    var urls = months.map(month => departmentKPI + '?' + 'departmentId=' + department + '&' + 'month=' + month + '&' + setUrlForCompare(req))
    console.log(urls);
    Promise.all(urls.map(url =>
        fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            .catch(error => console.log('There was a problem!', error))
    ))
        .then(data => {
            res.status(200)
                .json({
                    status: 'success',
                    data: lodash.orderBy(getKPIAndChangeFromArrayResponse(data), 'kpiValue', req.query.criteria)
                });
        })
}

function getListKPIDepartmentByYear(req, res, next) {
    // var url = 'api/v1/getAllDepartmentYearKPI?' + setUrlForGetList(req);
    // fetch(url)
    //     .then(checkStatus)
    //     .then(parseJSONWithPromise)
    //     .then(orderByDes)
    //     .then(data => {
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
            status: 'success',
            year: 2019,
            department_1: {
                department_id: 10,
                kpi_point: 90.0,
                department_name: "Phòng nghiên cứu và phát triển"
            },
            department_2: {
                department_id: 15,
                kpi_point: 85.0,
                department_name: "Sản xuất"
            }
        });
}

module.exports = {
    compareKPIDepartmentByYear: compareKPIDepartmentByYear,
    getListKPIDepartmentByYear: getListKPIDepartmentByYear,
    compareKPIOnlyDepartmentByYear: compareKPIOnlyDepartmentByYear
}

