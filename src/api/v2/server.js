// =======================
// packages we need 
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var jwt    		= require('jsonwebtoken'); 
var db          = require('./db');
var middleware  = require('./middleware');

// =======================
// configuration
// =======================
var port = process.env.PORT || 3003; // used to create, sign, and verify tokens

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes
// =======================
// basic route
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// API ROUTES -------------------
// get an instance of the router for api routes
var apiRoutes = express.Router(); 


// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(request, response) {
	var controller = require('./controllers/auth');
	controller.Authenticate(request, response);
});

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/register', function(request, response) {
    var controller = require('./controllers/register');
	controller.Register(request, response);
});

// route to return all news (GET http://localhost:8080/api/news)
apiRoutes.get('/news', function(request, response) {
    var controller = require('./controllers/news');
	controller.getNews(request, response);
});


/*
// TODO: route middleware to verify a token
// route middleware to verify a token
apiRoutes.use(function(request, response, next) {
   middleware.ensureAuthenticated(request, response, next);
});
*/



// =============================================================================== //
// access only with authenticate
// =============================================================================== //

// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function(request, response) {
  	response.json({ message: 'Welcome to the BetController API!' });
});


// =================================
// Begin route api controllers calls
// =================================

// route to return all sports (GET http://localhost:8080/api/sports)
apiRoutes.get('/sports', function(request, response) {
    var controller = require('./controllers/sports');
	controller.getSports(request, response);
});

// route to return specific sport (GET http://localhost:8080/api/sports/:id)
apiRoutes.get('/sports/:id', function(request, response) {
    var controller = require('./controllers/sports');
	controller.getSport(request, response);
});

// route to return all leagues (GET http://localhost:8080/api/leagues)
apiRoutes.get('/leagues', function(request, response) {
    var controller= require('./controllers/leagues');
	controller.getLeagues(request, response);
});

// route to return specific league (GET http://localhost:8080/api/leagues/:id)
apiRoutes.get('/leagues/:id', function(request, response) {
    var controller= require('./controllers/leagues');
	controller.getLeague(request, response);
});

// route to return specific league (GET http://localhost:8080/api/leagues/:id)
apiRoutes.get('/events/:idLeague', function(request, response) {
    var controller= require('./controllers/events');
	controller.getEventByLeague(request, response);
});


// route to return specific league (GET http://localhost:8080/api/tvschedule)
apiRoutes.get('/tvschedule', function(request, response) {
    var controller= require('./controllers/tvschedule');
	controller.getTvschedule(request, response);
});

// route to return specific league (GET http://localhost:8080/api/tvschedule)
apiRoutes.get('/balance/:id', function(request, response) {
    var controller= require('./controllers/balance');
	controller.getBalance(request, response);
});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// =======================
// start the server 
// =======================
app.listen(port, function(){
	console.log('Start server on port ' + port);
})
