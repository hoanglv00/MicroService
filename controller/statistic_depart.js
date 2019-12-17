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
        var KPI = 0;
        var kpi = {};
        
        for(var i=0; i<value.kpi_results.length; i++){
            var sumKPI = 0;
            for(var j=0; j<value.kpi_results[i].criterias.length; j++){
                sumKPI = sumKPI + value.kpi_results[i].criterias[j].ratio * 
                            value.kpi_results[i].criterias[j].complete_rating;
            }
            KPI = KPI + sumKPI;
        }     
        kpi.employee_id = value.kpi_results[0].employee_id;
        kpi.result = KPI / value.total;
        return kpi;
    }
    );
}

function setTime(req) {
    var params = {
        start_time: req.query.startTime,
        end_time: req.query.endTime
    };

    return query = Object.keys(params)
        .map(k => k + '=' + params[k])
        .join('&');
}

async function getAllEmployee(req) {
    var urlListEmp = 'http://206.189.34.124:5000/api/group8/departments/';
    var departID = req.query.id;
    var url = urlListEmp  + departID;
    
    var response = await fetch(url);
    var data = await response.json();
        
    return data.department.positions;
}

async function getKPIEmployeeInDepart(req, res, next) {
    var kpiResults = 'http://206.189.34.124:5000/api/group8/kpi_results';
    var employees = await getAllEmployee(req);
    //console.log(employees)
    var urls = employees.map(emp => kpiResults + '?' + 'department_id=' + req.query.id + '&' + setTime(req) + '&' + 'employee_id=' + emp.employee_id)
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
                    data: lodash.orderBy(getKPIFromArrayResponse(data), 'result', 'desc')
                });
        })
}

async function getKPIEmployeeInDepart(req, res, next) {
    var kpiResults = 'http://206.189.34.124:5000/api/group8/kpi_results';
    var employees = await getAllEmployee(req);
    //console.log(employees)
    var urls = employees.map(emp => kpiResults + '?' + 'department_id=' + req.query.id + '&' + setTime(req) + '&' + 'employee_id=' + emp.employee_id)
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
                    data: lodash.orderBy(getKPIFromArrayResponse(data), 'result', 'desc')
                });
        })
}

module.exports = {
    getKPIEmployeeInDepart
}

