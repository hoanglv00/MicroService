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

function getPercentKPIFromArrayResponse(array) {
    return array.map(value => {
        var ratio = [];
        var name = [];
        var complete_rating = [];
        var kpi = {};
        var result = {};

        for(var k=0; k<value.kpi_results[0].criterias.length; k++){
            ratio[k] = 0;
            name[k] = value.kpi_results[0].criterias[k].name
            complete_rating[k] = 0;
        }

        for(var i=0; i<value.kpi_results.length; i++){
            for(var j=0; j<value.kpi_results[i].criterias.length; j++){
                ratio[j] += value.kpi_results[i].criterias[j].ratio;
                complete_rating[j] += value.kpi_results[i].criterias[j].complete_rating;
            }
        }     
        kpi.employee_id = value.kpi_results[0].employee_id;
        ratio = ratio.map(eachRa => {
            return eachRa / value.total;
        })
        name = name;
        complete_rating = complete_rating.map(eachCom => {
            return eachCom / value.total;
        })
        var arrayTemp = [];
        for(var temp = 0; temp<ratio.length; temp++){
            var objectTemp = {};
            objectTemp.ratio = ratio[temp];
            objectTemp.name = name[temp];
            objectTemp.complete_rating = complete_rating[temp];

            arrayTemp.push(objectTemp);
        }
        kpi.result = arrayTemp;
        return kpi;
    }
    );
}

function compareKPIFromArrayResponse(array) {
    var listKPI = array.map(value => {
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
    });   
    // var listFinallKPI = lodash.orderBy(listKPI, 'result', 'desc');

    // if(listFinallKPI[0].result == listFinallKPI[1].result){
    //     var head = listFinallKPI[0].result;
    //     var filterObj = listFinallKPI.filter(function(e) {
    //         return e.result == head;
    //     });
    //     var found = [];
    //     filterObj.map(one => {
    //         found.push(array.find(element => element.kpi_results[0].employee_id == one.employee_id));

    //     })

    //     console.log(found)

    var listCompare = array.map(value => {
        var ratio = [];
        var name = [];
        var complete_rating = [];
        var kpi = {};
        var result = {};

        for(var k=0; k<value.kpi_results[0].criterias.length; k++){
            ratio[k] = 0;
            name[k] = value.kpi_results[0].criterias[k].name
            complete_rating[k] = 0;
        }

        for(var i=0; i<value.kpi_results.length; i++){
            for(var j=0; j<value.kpi_results[i].criterias.length; j++){
                ratio[j] += value.kpi_results[i].criterias[j].ratio;
                complete_rating[j] += value.kpi_results[i].criterias[j].complete_rating;
            }
        }     
        kpi.employee_id = value.kpi_results[0].employee_id;
        ratio = ratio.map(eachRa => {
            return eachRa / value.total;
        })
        name = name;
        complete_rating = complete_rating.map(eachCom => {
            return eachCom / value.total;
        })
        var arrayTemp = [];
        for(var temp = 0; temp<ratio.length; temp++){
            var objectTemp = {};
            objectTemp.ratio = ratio[temp];
            objectTemp.name = name[temp];
            objectTemp['complete_rating'] = complete_rating[temp];

            arrayTemp.push(objectTemp);
        }
        arrayTemp = lodash.orderBy(arrayTemp, 'ratio', 'desc')
        kpi.result = arrayTemp;
        //kpi.KPI = head;
        return kpi;
    });



    var arrayTemp = [];
    for(var walk2=0; walk2<listCompare.length; walk2++){
        var oneComplete = {};
        oneComplete['index'] = walk2;
        for(var walk=0; walk<listCompare[0].result.length; walk++){
            oneComplete['result'] = listKPI[walk2].result
            oneComplete['complete_rating'+walk] = listCompare[walk2].result[walk].complete_rating;         
            
        }
        arrayTemp.push(oneComplete);

    }
        //console.log(arrayTemp)
        var A = [];
        A.push('result');
        var B = [];
        B.push('desc');
        for(var walk4=0; walk4<listCompare[0].result.length; walk4++){
            A.push('complete_rating'+walk4);
            B.push('desc');

        } 
        console.log(A)
        console.log(B)
        var listComplete = lodash.orderBy(arrayTemp, A, B)
        console.log(listComplete)
        return listComplete;

    // }else{
    //     return listFinallKPI[0];
    // }
    
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

async function getPercentKPIEmployeeInDepart(req, res, next) {
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
            data: getPercentKPIFromArrayResponse(data)
        });
    })
}

async function compareKPIEmployeeInDepart(req, res, next) {
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
            data: compareKPIFromArrayResponse(data)
        });
    })
}

module.exports = {
    getKPIEmployeeInDepart,
    getPercentKPIEmployeeInDepart,
    compareKPIEmployeeInDepart
}

