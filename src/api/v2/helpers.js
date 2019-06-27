var db = require('./db');
var responseFormat  = require('./responseFormat');


exports.geOption = function(option,callback){

	db
	.select(
		'p.value AS value'
	)
	.from('opciones AS p')		
	.where('p.name', 'user_country')		
	.then(function(rows){
		callback(rows[0].value);
	})	
	.catch(function(err){		
		return responseFormat.Error(501,err.message,response);	
	});
};

