var Sequelize = require('sequelize')
var db = new Sequelize('maradepo_parleys','maracom','wzQrFvcEKGvR',{
	dialect: 'mysql'
})

var mMovimientos = db.define('m_movimientos',{
	id 			: {type: Sequelize.INTEGER,primaryKey : true,autoIncrement: true},
	id_usuario 	: {type: Sequelize.INTEGER},
	monto		: {type: Sequelize.DOUBLE},
	estado		: {type: Sequelize.CHAR(1)}
	},{
		timestamps 		: false,
		freezeTableName	: true,
		underscored		: true,	
		paranoid		: true
	});

module.exports = mMovimientos
