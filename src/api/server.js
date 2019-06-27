var express 	= require('express');  
var bodyParser  = require('body-parser');
var http 		= require('http');
var url 		= require('url');
//var jwt    		= require('jsonwebtoken');
var logs 		= require('./logs');
var responses 	= require('./responses');
var middleware 	= require('./middleware');
var app 		= express();


app.set('port',3001);

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({extended: true})); 

var server = http.createServer(app);

// Authentication routes
app.post('/api/v1/auth', (request, response) => {
	var methods = require('./controllers/auth');
	methods.emailLogin(request, response);
});


app.get('/', function(request, response) {
    responses.success(response,'Welcome to BetController API!');
});

// GET Returns all sports
app.get('/api/v1/sports', (request, response) => {
	var methods	= require('./controllers/sports');
	methods.getSports(request, response);
})

// GET Return a specific sport
app.get('/api/v1/sports/:id', (request, response) => {
	var methods	= require('./controllers/sports');
	methods.getSport(request, response);
})

// GET Returns all leagues
app.get('/api/v1/leagues', (request, response) => {
	var methods 	= require('./controllers/leagues');
	methods.getLeagues(request, response);
})

// GET Return a specific league
app.get('/api/v1/leagues/:id', (request, response) => {
	var methods 	= require('./controllers/leagues');
	methods.getLeague(request, response);
})


// Ruta solo accesible si estás autenticado
app.use('/api',middleware.ensureAuthenticated);


server.listen(app.get('port'), function(){
	logs.Success('Server iniciadado en el puerto ' + app.get('port'));
})
