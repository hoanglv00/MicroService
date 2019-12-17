const lodash = require('lodash');

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
function setUrlForCompare(req) {
    var params = {
        year: req.body.year
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

function compareTwoEmployeeInProject(req, res, next) {
    // var urls = ['api/v1/getDepartmentYearKPI?'
    //     + setUrlForCompare(req) + '&' + req.body.departmentId1,
    //     'api/v1/getDepartmentYearKPI?'
    //     + setUrlForCompare(req) + '&' + req.body.departmentId2];

    // Promise.all(urls.map(url =>
    //     fetch(url)
    //         .then(checkStatus)
    //         .then(parseJSON)
    //         .catch(error => console.log('There was a problem!', error))
    // ))
    //     .then(data => {
    //         res.status(200)
    //             .json({
    //                 status: 'success',
    //                 data: data
    //             });
    //     })
    res.status(200)
        .json({
            status: 'success',
            projectId: '11100',
            employee: [{
                id: 10,
                kpi_point: 90.0,
                tieu_chi_danh_gia_kpi: '',
                department_id: 1
            },
            {   id: 12,
                kpi_point: 90.0,
                tieu_chi_danh_gia_kpi: '',
                department_id: 1
            }]
        });
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
    compareTwoEmployeeInProject: compareTwoEmployeeInProject,
    // getListKPIDepartmentByYear: getListKPIDepartmentByYear
}

