 
var HomeController = function(){

	this.index = function(request, response){
		response.send("ok! NODEJS Application started, now go ahead with your developement.");
	}

}

module.exports.HomeController = function(){
	return new HomeController();
}
