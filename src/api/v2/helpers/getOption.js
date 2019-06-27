var responseFormat  = require('../responseFormat');

exports.geHelper = function(option,callback){

	db
	.select(
		'p.value AS value'
	)
	.from('opciones AS p')		
	.where('p.name', 'user_country')		
	.then(function(rows){
		return rows[0].value;
	})	
	.catch(function(err){		
		return responseFormat.Error(501,err.message,response);	
	});
};

