/**
 * http://usejsdoc.org/
 */

var express = require('express');
var app = express();

app.get('/getCompareKPIDepartment', function(req, res){
   res.send("Hello world!");
});

app.listen(process.env.PORT || 3000);

