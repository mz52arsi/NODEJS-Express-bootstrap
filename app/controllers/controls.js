
module.exports = function(){
	return {
		'HomeController' : require('./HomeController.js').HomeController(),
		'MemberController' : require('./MemberController.js').MemberController(),
	};

}