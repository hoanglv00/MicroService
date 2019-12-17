var mongoose =require('mongoose');

// var schema = new mongoose.Schema({
// 	timestamp: Date,
//     level: String,
//     message: String,
//     meta: String
// });

var schema = new mongoose.Schema({
	date: Date,
    log: String,
    v: Number
});
var Logc = mongoose.model('Logc', schema);

module.exports= Logc;