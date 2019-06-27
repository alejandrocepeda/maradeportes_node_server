var db = require('../db');
var responseFormat  = require('../responseFormat');

exports.getEventByLeague = function(request,response){

	var idLeague = request.params.idLeague;

	db
	.select(
		'e.id_encuentro AS id',
		db.raw("DATE_FORMAT(e.fecha_hora,'%Y%m%d %H:%i') AS starts"),
		'e.estado AS status',
		'away.nombre AS away',
		'home.nombre AS home'
	)
	.from('encuentros AS e')
	.innerJoin('equipos As home', 'e.id_equipo_local', 'home.id_equipo')
	.innerJoin('equipos As away', 'e.id_equipo_vis', 'away.id_equipo')
	.where('e.id_deporte',idLeague)
	.andWhereRaw("DATE_FORMAT(`e`.`fecha_hora`,'%Y%m%d %H:%i') >= DATE_FORMAT(now(),'%Y%m%d %H:%i')")
	.then(function(rows){
		
		return responseFormat.Data(200,rows,response);
	})	
	.catch(function(err){
		return responseFormat.Error(401,rows,err.message,response);		
	});
};


exports.getEventsInArrayLeague = function(inWhereArrayLeague,callback){

	db
	.select(
		'e.id_encuentro AS id',
		'e.id_deporte AS idLeague',
		db.raw("DATE_FORMAT(e.fecha_hora,'%Y%m%d %H:%i') AS starts"),
		'e.estado AS status',
		'away.alias AS away',
		'home.alias AS home'
	)
	.from('encuentros AS e')
	.innerJoin('equipos As home', 'e.id_equipo_local', 'home.id_equipo')
	.innerJoin('equipos As away', 'e.id_equipo_vis', 'away.id_equipo')
	.whereIn('e.id_deporte',inWhereArrayLeague)
	.andWhereRaw("DATE_FORMAT(`e`.`fecha_hora`,'%Y%m%d %H:%i') >= DATE_FORMAT(now(),'%Y%m%d %H:%i')")
	.then(function(rows){
		callback(rows);
	})	
	.catch(function(err){
		callback(err);
	});
};

exports.getEventsInArraySport = function(inWhereArrayLeague,callback){

	db
	.select(
		'e.id_encuentro AS id',
		'e.id_deporte AS idLeague',
		db.raw("DATE_FORMAT(e.fecha_hora,'%Y%m%d %H:%i') AS starts"),
		'e.estado AS status',
		'away.alias AS away',
		'home.alias AS home'
	)
	.from('encuentros AS e')
	.innerJoin('equipos As home', 'e.id_equipo_local', 'home.id_equipo')
	.innerJoin('equipos As away', 'e.id_equipo_vis', 'away.id_equipo')
	.innerJoin('deportes As d', 'd.id_deporte', 'e.id_deporte')
	.whereIn('d.id_tipodeporte',inWhereArrayLeague)
	.andWhereRaw("DATE_FORMAT(`e`.`fecha_hora`,'%Y%m%d %H:%i') >= DATE_FORMAT(now(),'%Y%m%d %H:%i')")
	.then(function(rows){
		callback(rows);
	})	
	.catch(function(err){
		callback(err);
	});
};

