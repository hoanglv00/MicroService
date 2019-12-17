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
    return response.json()
    
}

function parseJSONWithPromise(response) {
    return Promise.resolve(response.json());
}

function getListEmployee(data) {
    //console.log(data); 
    var listEmployeeTemp = data.department.positions;
    var listEmployee = listEmployeeTemp.map(e => {
        return e.employee_id;
    })
    return listEmployee;
}

function getListEmployeeFromDepart(req, res, next) {
    var departmentID = req.params.id;
    var url = 'http://206.189.34.124:5000/api/group8/departments/';
    fetch(url + departmentID)
        .then(checkStatus)
        .then(parseJSONWithPromise)
        .then(data =>{
            var listEmployee = getListEmployee(data)
            return listEmployee;
        })
        .catch(error => console.log('There was a problem!', error))
}

module.exports = {
    getListEmployeeFromDepart
}

