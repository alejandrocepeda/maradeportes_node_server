var logs 			= require('../logs');
var db 				= require('../db');

getUsers = function(callback){
	
	db
	.select(
		'u.id_usuario AS id',
		'u.nombre AS name',
		'u.login'
	)
	.from('usuarios  AS u')		
	.then(function(rows){
		callback(rows,null);
	})	
	.catch(function(err){
		logs.Error(err)
		callback(null,err);
	});
}  
exports.getUsers = getUsers;