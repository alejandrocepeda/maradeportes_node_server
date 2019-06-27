var db = require('knex')({
  client: 'mysql',
  connection: {
  	socketPath 	: '/var/lib/mysql/mysql.sock', 
    host     	: 'localhost',
    user     	: 'windepor_user',    
    password 	: 'pL9pRGc43GD3',
    database 	: 'windepor_hitplay',
    port 	 	: '5132'
  }
});

module.exports = db

