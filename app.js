const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const moment = require('moment');
var mongoose = require('mongoose');
var morgan = require('mongoose-morgan');
const expressWinston = require('express-winston');
const winston = require('winston');
require('winston-mongodb').MongoDB;
require('dotenv').config()
const port = process.env.PORT || 8080;

// const {
// 	MONGO_USERNAME,
// 	MONGO_PASSWORD,
// 	MONGO_HOSTNAME,
// 	MONGO_PORT,
// 	MONGO_DB
//   } = process.env;
const url = "mongodb+srv://lehoang:lehoang97@cluster0-luchm.mongodb.net/compare-service?retryWrites=true&w=majority";
//const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;
mongoose.Promise = global.Promise;
mongoose.connect(url).then(() => {
	console.log('Database connection successful');
})
	.catch(err => {
		console.error('Database connection error');
	})


var hello = require('./router/hello');
var compare_kpi_department_month = require('./router/compare_kpi_department_month');
var compare_kpi_department_time = require('./router/compare_kpi_department_time');
var compare_kpi_department_quarter = require('./router/compare_kpi_department_quarter');
var compare_kpi_department_year = require('./router/compare_kpi_department_year');

var compare_kpi_employee_month = require('./router/compare_kpi_employee_month');
var compare_kpi_employee_time = require('./router/compare_kpi_employee_time');
var compare_kpi_employee_quarter = require('./router/compare_kpi_employee_quarter');
var compare_kpi_employee_year = require('./router/compare_kpi_employee_year');

var compare_project = require('./router/compare_project');
var logRouter = require('./router/log_routers');
var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  next();
});

// app.use(session({
// 	secret: 'secret',
// 	resave: true,
// 	saveUninitialized: true
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// const timezonedTime = () => {
// 	return moment().format('YYYY-MM-DD hh:mm:ss')
// }

// app.use(expressWinston.logger({
// 	format: winston.format.combine(
// 		winston.format.colorize(),
// 		winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
// 		winston.format.json()
// 	),
// 	transports: [
// 		new winston.transports.MongoDB({
// 			db: url,
// 			collection: 'logs',
// 			useNewUrlParser: true,
// 			// level: function (req, res) {
// 			// 	var level = "";
// 			// 	if (res.statusCode >= 100) { level = "info"; }
// 			// 	if (res.statusCode >= 400) { level = "warn"; }
// 			// 	if (res.statusCode >= 500) { level = "error"; }
// 			// 	// Ops is worried about hacking attempts so make Unauthorized and Forbidden critical
// 			// 	if (res.statusCode == 401 || res.statusCode == 403) { level = "critical"; }
// 			// 	// No one should be using the old path, so always warn for those
// 			// 	if (req.path === "/v1" && level === "info") { level = "warn"; }
// 			// 	return level;
// 			// },
// 			//level: 'info',
// 			capped: true
// 		}),

// 	],
// 	meta: true,
// 	msg: "Request: HTTP {{req.method}} {{req.url}}; ipAddress {{req.connection.remoteAddress}}",
// 	requestWhitelist: [
// 		"url",
// 		"method",
// 		"httpVersion",
// 		"originalUrl",
// 		"query",
// 		"body"
// 	]
// }));

// var sessionChecker = function (req, res, next) {
// 	if (req.session.loggedin != true) {
// 		//res.send('Please login');
// 		next();
// 	} else {
// 		next();
// 	}
// }
app.use(morgan({
    collection: 'logcs',
    connectionString: 'url',
    useNewUrlParser: true,
   },
   {},
   'common'
));

app.use('/', hello);
app.use('/logs-comp', logRouter);
app.use('/comp-depart-month', compare_kpi_department_month)
app.use('/comp-depart-quarter', compare_kpi_department_quarter)
app.use('/comp-depart-year', compare_kpi_department_year)
app.use('/comp-depart', compare_kpi_department_time)

app.use('/comp-emp-month', compare_kpi_employee_month)
app.use('/comp-emp-quarter', compare_kpi_employee_quarter)
app.use('/comp-emp-year', compare_kpi_employee_year)
app.use('/comp-emp', compare_kpi_employee_time)

app.listen(port, () => {
	console.log("Port 8080")
});

module.exports = app;

