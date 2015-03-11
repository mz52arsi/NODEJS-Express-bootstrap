// Use your favorite Queueing API to modify the configurations
var QueueConfig = function(){

	this.host = "127.0.0.1";
	this.port = "6379";
	this.db = 0;
	this.queueName = "JOB_Queue";
};

module.exports = function(){
	return new QueueConfig();
}