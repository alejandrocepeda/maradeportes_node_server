var logs 			= require('./logs');
var db 				= require('./db');
var responses 		= require('./responses');

exports.getLeagues = function(request, response){

	db
	.select(
		'd.id_deporte AS id',
		'd.nombre AS name',
		db.raw("CONCAT('http://maradeportes.com/app/logos_deportes/',d.logo) AS picture"),
		db.raw("COALESCE((SELECT 1 FROM encuentros AS e WHERE DATE_FORMAT(e.fecha_hora,'%Y%m%d %H:%i') >= DATE_FORMAT(now(),'%Y%m%d %H:%i') AND e.id_deporte = d.id_deporte LIMIT 1),0) AS hasEvents")
	)
	.from('deportes AS d')
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


exports.getLeague = function(request, response){
	
	var id = request.params.id

	db
	.select(
		'd.id_deporte AS id',
		'd.nombre AS name',
		db.raw("CONCAT('http://maradeportes.com/app/logos_deportes/',d.logo) AS picture"),
		db.raw("COALESCE((SELECT 1 FROM encuentros AS e WHERE DATE_FORMAT(e.fecha_hora,'%Y%m%d %H:%i') >= DATE_FORMAT(now(),'%Y%m%d %H:%i') AND e.id_deporte = d.id_deporte LIMIT 1),0) AS hasEvents")
	)
	.from('deportes AS d')
	.where('d.id_deporte', id)
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
