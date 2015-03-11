
var AuthUser = function(){

}

AuthUser.isLoggedIn = function(request){
	var session = request.session;
	if(session.user_id){
		return true;
	}
	return false;
}

AuthUser.getLoggedInUserId = function(request){
	var session = request.session;
	var author_id = session.user_id;

	return author_id;
}

module.exports = AuthUser;