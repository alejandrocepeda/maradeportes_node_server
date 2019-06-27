var db = require('../db');
var responseFormat  = require('../responseFormat');

exports.getTvschedule = function(request, response){

	db
	.select(
		db.raw("DATE_FORMAT(en.fecha_hora,'%Y%m%d %H:%i') as dateTime"),
		'ca.nombre AS nameChannel',
		'ca.logo AS pictureChannel',
		'de.nombre AS nameLeague',
		'away.alias AS away',
		'home.alias AS home'
	)
	.from('encuentros AS en')		
	.innerJoin('canales As ca', 'en.id_canal', 'ca.id_canal')
	.innerJoin('deportes As de', 'en.id_deporte', 'de.id_deporte')
	.innerJoin('equipos As home', 'en.id_equipo_local', 'home.id_equipo')
	.innerJoin('equipos As away', 'en.id_equipo_vis', 'away.id_equipo')
	.where('en.id_canal','<>',0)
	.where('en.id_canal', '<>', 14)
	.where('en.id_equipo_vis', '<>', 1717)
	.where('en.id_equipo_local', '<>', 1716)
	.andWhereRaw("DATE_FORMAT(en.fecha_hora,'%Y%m%d') = DATE_FORMAT(now(),'%Y%m%d')")
	.then(function(rows){
		return responseFormat.Data(200,rows,response);

	})	
	.catch(function(err){
		return responseFormat.Error(401,rows,err.message,response);	
	});
};
