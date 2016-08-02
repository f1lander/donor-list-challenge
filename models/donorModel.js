var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var donorSchema = new Schema({
	name : {type: String, unique: true},
	lastname : {type: String},
	location : { type:[Number], index: '2d', required: true},
	bloodtype : {type: String, unique: true},
});

module.exports = mongoose.model('donor', donorSchema);