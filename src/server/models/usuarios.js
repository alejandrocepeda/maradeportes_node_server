var Sequelize = require('sequelize')
var db = new Sequelize('maradepo_parleys','maracom','wzQrFvcEKGvR',{
	dialect: 'mysql'
})

var Usuarios = db.define('m_usuarios',{
	id_usuario 	: {type: Sequelize.INTEGER,primaryKey : true,autoIncrement: true},
	login		: {type: Sequelize.STRING},
	nombre		: {type: Sequelize.STRING},
	apellido	: {type: Sequelize.STRING}
	},{
		timestamps 		: false,
		freezeTableName	: true,
		underscored		: true,	
		paranoid		: true
	});

module.exports = Usuarios
