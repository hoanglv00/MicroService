const fetch = require('node-fetch');
const url = 'http://dsd05-dot-my-test-project-252009.appspot.com/permission/getPermissionsOfUser?';

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

function checkRules(req, res, next){
	 fetch(url + 'userId =' + req.userId)
        .then(checkStatus)
        .then(parseJSONWithPromise)
        .then(response => {
        	//check rules
        })
        .catch(error => console.log('There was a problem!', error))
}

module.exports = {
	checkRules
}