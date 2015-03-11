//DEFAULT config for Redis Server to be used for Cache
//Modify this file based on the requirement for Cache Plugin being used
//Design specifically for Redis
var CacheConfig = function(){

	this.host = "127.0.0.1";
	this.port = "6379";
	this.db = "1";
};

module.exports = function(){
	return new CacheConfig();
}