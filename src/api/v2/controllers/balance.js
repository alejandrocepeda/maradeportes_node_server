var db = require('../db');

var responseFormat  = require('../responseFormat');

exports.getBalance = function(request, response){

	var idClient = request.params.id;

	db
	.select(
		db.raw('m_fun_disponible(' + idClient + ') AS availableBalance'),
		db.raw('m_fun_enjuego(' + idClient + ') AS openBetsBalance'),
		db.raw('m_fun_jugada_gratis(' + idClient + ') AS freeBetsBalance')
	)	
	.then(function(rows){
		return responseFormat.Data(200,rows,response);

	})	
	.catch(function(err){		
		return responseFormat.Error(401,err.message,response);	
	});
};

