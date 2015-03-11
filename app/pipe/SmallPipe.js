// This Class is specifically created for Calback problems/
// consider a scenario where in you have list of IDS and you want data for each ID via seperate Query
// Then such cases you need to declare a Small Pipe

// ------------------------------Example--------------------------------------
//		var queries = [];
//		var tag_pipe = new SmallPipe(tags.length, function(){
//			// Task to perform after getting all the queries
//			return queries;
//		});
//		
//		
//		for (var i = tags.length - 1; i >= 0; i--) {
//			//Query Cache for each TAG and store the data into some data variable
//			tagIndex.getQueryIdsFromCache(tags[i], function(err, queryIds){
//				queries = queries.concat(queryIds);
//				tag_pipe.fill(err);
//			});
//		};

//		tag_pipe.spill();
// ------------------------------End of Example-------------------------------

var SmallPipe = function(max, callback){
	var count = 0;
	var max = max;
	

	this.fill = function(err){
		console.log("Filled: ", count, " capacity:", max);
		count++;
		
	}

	this.spill = function(){

		setTimeout(function() {
			console.log("try to spill if capacity is reached", count, max);
			if(count >= max){
				console.log("spill");
				clearTimeout(this); 
				callback();
			}	
		}, 1);
		
	}
	
}

module.exports = SmallPipe;