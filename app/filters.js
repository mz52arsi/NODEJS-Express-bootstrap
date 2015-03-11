var AuthUser = require('./models/session/AuthUser.js');

var Filters = function(){

	this.requireAuth = function(request, response){
		console.log("Perform Authentication");
		
		//console.log(request.session);
		
		if(AuthUser.isLoggedIn(request)){
			request.next();
		}
		else{
			response.status(403);
			response.send({
				message : "Not allowed",
				errorCode : "403"
			});
		}
	}

	this.unexpectedErrorHandler = function(err, req, res, next){
		res.status(500).send({ 
			error: 'Something blew up!' 
		});
	}
};



module.exports = function(){
	return new Filters();
}