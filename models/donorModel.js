var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var donorSchema = new Schema({
	name : {type: String},
	lastname : {type: String},
	address:{type:String},
	location : { type:[Number], index: '2d', required: true, unique:false},
	bloodtype : {type: String},
	gender:{type:String},
	age:{type:Number},
	weight:{type:Number}
});

module.exports = mongoose.model('donor', donorSchema);