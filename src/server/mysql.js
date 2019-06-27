var mysql      = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'maracolo_user',
  password        : 'B18tfk6',
  database        : 'maracolo_hitplay'
});

getConection = function(){
	return pool
}

exports.getConection = getConection;