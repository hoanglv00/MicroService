
var getDatas = function(req, res, next){
	  console.log("get data");
	var http = require('http');
  var str = "";

  var options = {
        host: 'localhost:3001',
        path: '/'
  };

  callback = function(response) {

        response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(req.data);
    console.log(str);
    response.status(200).json({
    	result:str
    })
    // your code here if you want to use the results !
  });

        //return str;
  }

  var req = http.request(options, callback).end();

  // These just return undefined and empty
  console.log(req.data);
  console.log(str);
  return data;
}

module.exports = getDatas