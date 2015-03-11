var express = require('express');
var express_app = express();

var express_session = require('express-session');

var mongoose = require('mongoose');

var redis = require('redis');




var filters = require('./app/filters.js');
var filter = filters();

var controllers = require('./app/controllers/controls.js')();

var routes = require('./app/routes.js');
var route = routes(express ,express_app, express_session, filter, controllers);



var application_config = require('./app/config/app.js');
var database_config = require('./app/config/database.js');
var cache_config = require('./app/config/cache.js');
var queue_config = require('./app/config/queue.js');

var config = {
	'app' : application_config(),
	'database' : database_config(),
	'cache' : cache_config(),
	'queue' : queue_config(),
};


var db_connection_url = config.database.driver + '://' + config.database.host + ":" + config.database.port + "/" + config.database.databaseName; 
mongoose.connect(db_connection_url);

var redis_client = redis.createClient(config.cache.port, config.cache.host);
var cacheFactory = require('./app/cache/CacheFactory.js');
cacheFactory.setInstance(redis_client, config.cache);

var queueFactory = require('./app/queue/QueueFactory.js');
queueFactory.setInstance(redis_client, config.queue);

express_app.listen(config.app.port);

console.log("NODE application Started : " + config.app.port);


