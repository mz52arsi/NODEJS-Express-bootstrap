var mongoose = require('mongoose');

var MemberSchema = mongoose.Schema({
	
	username : String,
	password : String,
	number_answers : Number,
	number_queries : Number
});


var Member = mongoose.model('Member', MemberSchema);

module.exports = Member;