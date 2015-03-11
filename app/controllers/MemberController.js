var Member = require('../models/Member.js');
var Pagination = require('../models/pagination/paginate.js');


var MemberController = function(){
	

	this.index = function(request, response){
		
		var paginationLimit = 10;
		
		Pagination(request, Member).paginate({}, paginationLimit, { number_queries : "desc", number_of_answers : "desc"}, { password : 0 }, function(members){
			var members_modified = [];

			for (var i = members.length - 1; i >= 0; i--) {
				var member = {
					_id : members[i]._id,
					username : doc.username,
					number_queries : doc.number_queries,
					number_of_answers : doc.number_of_answers
				};
				members_modified.push(members[i]);
			};
			response.send(members_modified);
		});
	
	}

	this.view = function(request, response){
		
		var member_id = request.params.id;

		Member.findOne({ _id : member_id }, function(err, doc){
			if(err){
				response.status(500);
				response.send({
		  			message : "Error while retrieving the Member",
		  			errorCode : "500"
		  		});
				return;
			}

			var member = {
				_id : doc._id,
				username : doc.username,
				number_queries : doc.number_queries,
				number_of_answers : doc.number_of_answers
			};

			response.send(member);
		});
	
	}

	this.create = function(request, response){
		var username = request.param('username');
		var password = request.param('password');
		
		
		if(isEmptyOrNull(username) || isEmptyOrNull(password)){
			response.status(403);
			response.send({ 
				message : "Member Creation requires both username and password set!",
				errorCode : "403"
			});
			return;
		}

		isMemberPresent(username, function(ispresent){

			if(ispresent){
				response.status(200);
				response.send({
					message : "Already Available",
					errorCode : "200"
				});
				return;	
			}

			var member  = new Member({
				username : username,
				password : password,
				
			});

			member.save(function (err) {
			  if (err){
			  	response.status(500);
			  	response.send({
			  		message : "Error while saving the Member",
			  		errorCode : "500"
			  	});
			  }
			  
			  response.send({ 
			  	message : "Member Created",
			  	errorCode : "200"
			  });

			});

		});
			
		

				
	}

	this.update = function(request, response){
		var userId = request.params.id;

		var username = request.param('username');
		var password = request.param('password');
		

		Member.findOne({ _id : userId}, function(err, doc){
			if(err || doc === null){
				response.status(500);
				response.send({
		  			message : "Error while retrieving the Member",
		  			errorCode : "500"
		  		});
				return;
			}

			doc.username = isEmptyOrNull(username) ? doc.username : username;
			doc.password = isEmptyOrNull(password) ? doc.password : password;
			

			doc.save();
			response.send({
	  			message : "Member updated",
	  			errorCode : "200"
	  		});
		});

	}

	this.delete = function(request, response){
		var userId = request.params.id;

		Member.findOne({ _id : userId}, function(err, doc){
			if(err || doc === null ){
				response.status(500);
				response.send({
		  			message : "Error while deleting the Member",
		  			errorCode : "500"
		  		});
				return;
			}

			doc.remove();
			response.send({
	  			message : "Member Deleted",
	  			errorCode : "200"
	  		});
		});
	}

	function isEmptyOrNull(data){
		return data === "" || data === undefined ? true : false;
	}

	function isMemberPresent(username, callback){
		
		Member.where('username').equals(username).exec(function(err, doc){
			
			if(doc === null || doc.length === 0 || err){
				
				callback(false);
				return;
			}

			callback(true);
			return;
		});

		
	}
}

module.exports.MemberController = function(){
	return new MemberController();
}