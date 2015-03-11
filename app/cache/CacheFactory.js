var CacheFactory = function(){

}

CacheFactory.redis = null;
CacheFactory.config = null;

CacheFactory.setInstance = function(redis_client, config){
	if(CacheFactory.redis === null){
		CacheFactory.redis = redis_client;
		CacheFactory.config = config
		console.log('setting the instance for Cache DB = ' + config["db"]);
	}
};

CacheFactory.getInstance = function(){
	return CacheFactory.redis;
};


// Utility Methods to access Cache
CacheFactory.queryCache = function(query, callback){

	CacheFactory.redis.select(CacheFactory.config['db'], function(){
		//Query Cache with KEY = > LIST  
		CacheFactory.redis.lrange(query, 0, -1, function(err, reply){
			callback(err, reply);
		});
	});
}

module.exports = CacheFactory;