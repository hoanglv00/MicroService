const mongoose = require('mongoose');
var Logc =require('../model/log_model.js')

module.exports = {
	getAllLog: function(req, res, next) {		
		Logc.find().sort({
			stt: -1
		}).limit(30).then(function(datas) {
			  res.status(200).json({
					data: datas,
					status: 'success'
				});
		}).catch(err => {
			console.error('Database connection error');
		});
	},
	getByTime: function(req,res,next){
		console.log(req.query);
		console.log(new Date(req.query.startTime));
         Logc.find({
         	date: { $gte: new Date(req.query.startTime), $lte: new Date(req.query.endTime) }
         }).sort({
			stt: -1
		}).limit(30).then(function(datas) {
			  res.status(200).json({
					data: datas,
					status: 'success'
				});
		}).catch(err => {
			console.error('Database connection error');
		});
	}
	}