var logs 			= require('./logs');
var db 				= require('./db');

getUsuarios = function(callback){
	
	db
	.select(
		'u.id_usuario AS id',
		'u.nombre AS name',
		'u.login'
	)
	.from('usuarios  AS u')		
	.where(function(){
		this.where('u.login', 'acepeda').orWhere('u.login', 'hurdaneta')
	})
	.then(function(rows){
		callback(rows,null);
	})	
	.catch(function(err){
		logs.Error(err)
		callback(null,err);
	});
}  
exports.getUsuarios = getUsuarios;