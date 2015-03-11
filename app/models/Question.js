var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AnswerSchema = Schema({
	
	resolution : String,
	author : Schema.ObjectId,
	thumbs_up : [Schema.ObjectId],
	thumbs_down : [Schema.ObjectId],
	created_at : Date,
	updated_at : Date,

});

var QuestionSchema = Schema({
	
	query : String,
	author : Schema.ObjectId,
	hide_author : Boolean,
	tags : [String],
	category : Schema.ObjectId,
	answers : [AnswerSchema],
	thumbs_up : [Schema.ObjectId],
	thumbs_down : [Schema.ObjectId],
	created_at : Date,
	updated_at : Date,

});


var Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;