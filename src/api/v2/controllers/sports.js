var db = require('../db');
var events 	= require('./events');
var responseFormat  = require('../responseFormat');
//var helpers = require('../helpers');

exports.getSports = function(request, response){

	
	db
	.select(
		'd.id_tipodeporte AS id',
		'd.nombre AS name'
	)
	.from('tiposdeportes AS d')		
	.then(function(rows){
		return responseFormat.Data(200,rows,response);
	})	
	.catch(function(err){		
		return responseFormat.Error(401,rows,err.message,response);	
	});
	
	
	/*
	helpers.geOption('user_country').then(function(c) {
		console.log(c);
	});
	*/
};

exports.getSport = function(request, response){
	
	var id = request.params.id

	db
	.select(
		'd.id_tipodeporte AS id',
		'd.nombre AS name'
	)
	.from('tiposdeportes AS d')		
	.where('d.id_tipodeporte', id)	
	.then(function(rows){	
		return responseFormat.Data(200,rows,response);
	})	
	.catch(function(err){
		return responseFormat.Error(401,rows,err.message,response);	
	});
};
