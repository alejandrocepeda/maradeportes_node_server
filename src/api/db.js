


var db = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'localhost',
    user     : 'maracom',
    password : 'wzQrFvcEKGvR',
    database : 'maradepo_parleys'
  }
});

module.exports = db
