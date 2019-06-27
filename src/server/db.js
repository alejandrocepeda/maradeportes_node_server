var configIni = require('config.ini');
conf   = configIni.load('/home/maradeportes/public_html/config/config.ini');

var db = require('knex')({
  client: 'mysql',
  connection: {
  	socketPath 	: '/var/lib/mysql/mysql.sock',
    host        : conf.DataBase.host,
    user        : conf.DataBase.username,
    password    : conf.DataBase.password,
    database    : conf.DataBase.database,
    port 	 	: conf.DataBase.port
  }
});

module.exports = db
