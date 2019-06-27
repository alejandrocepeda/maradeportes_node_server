var logs 			= require('./logs');
var db 				= require('./db');

exports.getSports = function(request, response){

	db
	.select(
		'd.id_tipodeporte AS id',
		'd.nombre AS name'
	)
	.from('tiposdeportes AS d')		
	.then(function(rows){
		return response
			.status(200)
			.json({'status' : 'success','data ' : rows});

	})	
	.catch(function(err){
		logs.Error(err)
		return response.status(500).json({'status' : 'error','message': err.code});
	});
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

		return response
			.status(200)
			.json({'status' : 'success','data ' : rows});

	})	
	.catch(function(err){
		logs.Error(err)
		return response.status(500).json({'status' : 'error','message': err.code});
	});
};
