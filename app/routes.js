var bodyParser = require('body-parser');
module.exports = function(express, app, session, filter, controllers){
	
	app.use(session({
		secret: 'keyboard cat'
		//resave: false,
		//saveUninitialized: true,
		//cookie: { secure: true }
	}));
	
	// ----- uncomment this for using MVC frameworks like Angularjs
	//app.use('/', express.static(__dirname + '/public'));
	app.use(filter.unexpectedErrorHandler);
	app.use(bodyParser.json());

	// Filter for authentication	
	app.all('/authenticated/*', filter.requireAuth);

	app.get('/', controllers['HomeController'].index);

	//-------------------------------Members---------------------------
	app.get('/members/', controllers['MemberController'].index);
	app.get('/members/view/:id', controllers['MemberController'].view);
	app.get('/members/create', controllers['MemberController'].create);//http://127.0.0.1:3000/members/create?username=moiz&password=PassW0rD
	app.get('/authenticated/members/update/:id', controllers['MemberController'].update);
	app.get('/authenticated/members/delete/:id', controllers['MemberController'].delete);

}
