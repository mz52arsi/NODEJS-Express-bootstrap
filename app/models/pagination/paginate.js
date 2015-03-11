var URL = require('url');

var Pagination = function(request, model){
	this.request = request;
	this.model = model;

	this.paginate = function(query, limit, sort, selected, onDataReception){

		var url = URL.parse(this.request.url).pathname;
		var page = this.request.param('page');
		page = page === undefined ? 0 : page;

		this.model.find(query).sort(sort).skip(page*limit).limit( (limit + 1) ).select( selected ).exec(function(err, members){
			
			//Fetched more than the limit
			members.splice(limit, 1);
			
			var paginatedMembers = {
				data : members
			};

			if(members.length >= limit ){
					nextPage = parseInt(page) + 1;
					paginatedMembers["next"] = url + "?page=" + nextPage;
			}
			if (page >= 1) {
				prevPage = parseInt(page) - 1;
				paginatedMembers["prev"] = url + "?page=" + prevPage;
			};
			
			onDataReception(paginatedMembers);
		});
	};

}

module.exports = function(request, model){
	return new Pagination(request, model);
}


