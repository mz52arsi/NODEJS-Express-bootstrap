// Designed specifically for MONGO DB
//Modify this to use your favorite Configuration file.
var DatabaseConfig = function(){

	this.driver = "mongodb";
	this.host = "localhost",
	this.port = "27017",
	this.databaseName = "TESTDB"
}

module.exports = function(){
	return new DatabaseConfig();
}