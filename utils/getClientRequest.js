const rp = require('request-promise');

module.exports = {
    getClientRequest: function (uri){
        uri.array.forEach(element => {
            var options = {
                uri: element,
                json: true // Automatically parses the JSON string in the response
            };
             
            rp(options)
                .then(function (res) {
                    return res.json;
                })
                .catch(function (err) {
                    console.log(err);
                });
        });
        fetch
    }
}