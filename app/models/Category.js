var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
	
	category_type : String,
	created_at : Date,
	updated_at : Date
	
});


var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;