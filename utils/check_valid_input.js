var date = /^((?:(?:1[6-9]|2[0-9])\d{2})(-)(?:(?:(?:0[13578]|1[02])(-)31)|((0[1,3-9]|1[0-2])(-)(29|30))))$|^(?:(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(-)02(-)29)$|^(?:(?:1[6-9]|2[0-9])\d{2})(-)(?:(?:0[1-9])|(?:1[0-2]))(-)(?:0[1-9]|1\d|2[0-8])$/

var dateTimeRegex = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\s([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
var monthRegex = /(0[1-9]|1[012])/;
var yearRegex = /^(19|2[0-9])\d{2}$/;
var quarterRegex = /(0[1-4])/;
const moment = require('moment');

function isTimeQuey(req, res, next){	
	var OKStart = dateTimeRegex.test(req.query.startTime);  
    if (!OKStart)  
        res.send('Error params startTime');
    else{
        var OKEnd = dateTimeRegex.test(req.query.endTime); 
        if (OKEnd)
        	next(); 
        else 
        	res.send('Error params endTime');	 
    }
}

function isTimeBody(req, res, next){	
	var OKStart = dateTimeRegex.test(req.query.startTime);  
    if (!OKStart)  
        res.send('Error query startTime');
    else{
        var OKEnd = dateTimeRegex.test(req.query.endTime); 
        if (OKEnd){
            var start = moment(req.query.startTime, "YYYY-MM-DD HH:mm:ss");
            var end = moment(req.query.endTime, "YYYY-MM-DD HH:mm:ss");
            if(start.isBefore(end)){
                next();
            }else{
                res.send('Error startTime after endTime');
            }            
        }
        else{ 
        	res.send('Error query endTime');	 
        }
    }
}

function isTimeBodyEmp(req, res, next){    
    var OKStart = date.test(req.query.startTime);  
    if (!OKStart)  
        res.send('Error query startTime');
    else{
        var OKEnd = date.test(req.query.endTime); 
        if (OKEnd){
            var start = moment(req.query.startTime, "YYYY-MM-DD");
            var end = moment(req.query.endTime, "YYYY-MM-DD");
            if(start.isBefore(end)){
                next();
            }else{
                res.send('Error startTime after endTime');
            }            
        }
        else{ 
            res.send('Error query endTime');     
        }
    }
}


function isMonth(req, res, next){    
    var OK = monthRegex.test(req.query.month);  
    if (!OK)  
        res.send('Error query month 01, 02, ..., 12');
    else{
        next(); 
    }
}

function isYear(req, res, next){    
    var OK = yearRegex.test(req.query.year);  
    if (!OK)  
        res.send('Error body year 1900-2999');
    else{
        next(); 
    }
}

function isQuarter(req, res, next){    
    var OK = quarterRegex.test(req.query.quarter);  
    if (!OK)  
        res.send('Error query quarter 01->04');
    else{
        next(); 
    }
}

module.exports = {
	isTimeQuey,
	isTimeBody,
    isMonth,
    isYear,
    isQuarter,
    isTimeBodyEmp
}