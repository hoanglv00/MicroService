const rp = require('request-promise');
const lodash = require('lodash');
const fetch = require('node-fetch');

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

function setUrlForCompare(req) {
    var params = {
        startTime: req.query.startTime,
        endTime: req.query.endTime
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

function compareKPIDepartmentByTime(req, res, next) {
    var departmentKPI = 'http://18.217.21.235:8083/api/v1/departmentKPI/getDepartmentKPI';
    var department = req.query.department;
    var urls = department.map(id => departmentKPI + '?' + setUrlForCompare(req) + '&' + 'departmentId=' + id)
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

function getListKPIDepartmentByTime(req, res, next) {
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
    compareKPIDepartmentByTime: compareKPIDepartmentByTime,
    getListKPIDepartmentByTime: getListKPIDepartmentByTime
}

