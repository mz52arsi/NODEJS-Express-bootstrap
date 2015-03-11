var QueueFactory = function(){

}

QueueFactory.redis = null;
QueueFactory.config = null;


QueueFactory.setInstance = function(redis_client, config){
	if(QueueFactory.redis === null){
		QueueFactory.redis = redis_client;
		QueueFactory.config = config;
		console.log('setting the instance for queue factory Queue: ' + QueueFactory.config["queueName"] + "	DB:" + QueueFactory.config["db"]);
	}
};

QueueFactory.push = function(handler, data){
	var payLoad = JSON.stringify({
		handler : handler,
		data : data,
		timestamp : new Date()
	});

	QueueFactory.redis.select(QueueFactory.config['db'], function(){
		QueueFactory.redis.rpush([QueueFactory.config["queueName"], payLoad] , function(err, ok){
			console.log("Push to Queue ", QueueFactory.config["queueName"], " Error: ",err, " Response: ",ok);
		});
	});
	
};

module.exports = QueueFactory;