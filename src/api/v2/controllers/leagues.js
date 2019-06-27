var db 		= require('../db');
var events 	= require('./events');
var responseFormat  = require('../responseFormat');

exports.getLeagues = function(request, response){

	db
	.select(
		'd.id_deporte AS id',
		'd.nombre AS name',
		db.raw("CONCAT('http://maradeportes.com/app/logos_deportes/',d.logo) AS picture")
	)
	.from('deportes AS d')
	.then(function(rows){
		
		// ===================================
		// create module for refactor
		// ===================================
		var arryLeagues		= [];	
		
		for (var i = 0; i < rows.length; i++) {
			arryLeagues.push(rows[i].id);	
		}
		
		
		events.getEventsInArrayLeague(arryLeagues,function(arrayResult){

			for (var i = 0; i < rows.length; i++) {
		
				var rowResult = arrayResult.filter(
					function(item) {
					    return (item.idLeague == rows[i].id);
					}
				);

				if (rowResult.length > 0){
					rows[i]['events'] = rowResult;
				}
			}
			
			return responseFormat.Data(200,rows,response);

		});
		
		// ===================================
		// create module for refactor
		// ===================================	
				
	})	
	.catch(function(err){		
		return responseFormat.Error(401,err.message,response);
	});
};


exports.getLeague = function(request, response){
	
	var id = request.params.id

	db
	.select(
		'd.id_deporte AS id',
		'd.nombre AS name',
		db.raw("CONCAT('http://maradeportes.com/app/logos_deportes/',d.logo) AS picture")
	)
	.from('deportes AS d')
	.where('d.id_deporte', id)
	.then(function(rows){

		// ===================================
		// create module for refactor
		// ===================================
		var arryLeagues		= [];	
		
		for (var i = 0; i < rows.length; i++) {
			arryLeagues.push(rows[i].id);	
		}
				
		events.getEventsInArrayLeague(arryLeagues,function(arrayResult){
			for (var i = 0; i < rows.length; i++) {
		
				var rowResult = arrayResult.filter(
					function(item) {
					    return (item.idLeague == rows[i].id);
					}
				);

				if (rowResult.length > 0){
					rows[i]['events'] = rowResult;
				}
			}
			
			return responseFormat.Data(200,rows,response);
		});
		// ===================================
		// create module for refactor
		// ===================================
	})	
	.catch(function(err){		
		return responseFormat.Error(401,err.message,response);
	});
};
