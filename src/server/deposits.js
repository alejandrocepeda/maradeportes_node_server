var logs 			= require('./logs');
var db 				= require('./db');
/*
var mMovimientos 	= require('./models/mmovimientos');
var Usuarios 		= require('./models/usuarios');
*/


getDeposits = function(id_mov,callback){
	
	db
	.select(
		'u.nombre',
		'u.apellido',
		'u.email',
		'u.cedula',
		'u.permite_jugar_gratis',
		'm.id_usuario',
		'm.monto',
		'm.referencia_bancaria',
		'm.retiro_por_taquilla',
		'm.id',
		'm.tipo_mov',
		'm.estado',
		db.raw("COALESCE(m.observacion,'') AS observacion"),
		'm.id_banco_origen',		
		db.raw("m.banco AS banco_destino"),
		db.raw('COALESCE(bo.nombre,"N/A") AS nombre_banco_origen'),
		db.raw('COALESCE(b.nombre,"N/A") AS nombre_banco'),
		db.raw('DATE_FORMAT(h.fecha_solicitud,"%d/%m/%Y %h:%i:%s %p") AS fechaSolicitud'),
		db.raw('DATE_FORMAT(h.fecha_procesado,"%h:%i:%s %p") AS fechaProcesado')
	)
	.from('m_movimientos  AS m')
	.innerJoin('m_usuarios AS u', 'u.id_usuario', 'm.id_usuario')
	.leftJoin('m_jugadas_gratis AS j', 'm.id_usuario', 'j.id_usuario')
	.leftJoin('m_historial_movimientos AS h', 'm.id', 'h.id')
	.leftJoin('m_bancos AS b', 'm.banco', 'b.id_banco')
	.leftJoin('m_bancos AS bo', 'm.id_banco_origen', 'bo.id_banco')
	.where('m.id', id_mov).then(function(rows){
    	callback(rows,null);
	})
	.catch(function(err){
		logs.Error("Message xx :" + err);
		callback(null,err);
	});
}  
exports.getDeposits = getDeposits;



