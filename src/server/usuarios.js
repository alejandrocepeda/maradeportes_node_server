var logs 			= require('./logs');
var db 				= require('./db');
/*
var mMovimientos 	= require('./models/mmovimientos');
var Usuarios 		= require('./models/usuarios');
*/


getUsuarios = function(callback){
	
	db
	.select(
		'u.id_usuario',
		'u.nombre',
		'u.login'
	)
	.from('usuarios  AS u')		
	.where('u.login', 'acepeda')
	.then(function(rows){
		callback(rows,null);
	})	
	.catch(function(err){
		logs.Error(err)
		callback(null,err);
	});
}  
exports.getUsuarios = getUsuarios;