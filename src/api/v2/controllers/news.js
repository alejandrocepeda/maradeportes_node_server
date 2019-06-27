var responseFormat  = require('../responseFormat');

var dbBlog = require('knex')({
  client: 'mysql',
  connection: {
  	socketPath 	: '/var/lib/mysql/mysql.sock', 
    host     	: 'localhost',
    user     	: 'maracom_bloguser',    
    password 	: '6lSbeHpXtGDy',
    database 	: 'maracom_blog',
    port 	 	: '5132'
  }
});

exports.getNews = function(request, response){

	var s = dbBlog
	.select(
		'a.post_content AS content',
		'a.post_title AS title',		
		dbBlog.raw('max(c.guid) AS picture'),
		'a.ID AS idNew',
		'ter.name AS nameSport',
		'tr.term_taxonomy_id AS idSport'
	)
	.from('ZUYmGrmvNPUz_posts AS a')
	.innerJoin(dbBlog.raw("(select post_parent, max(post_date_gmt) as latest_image_date from ZUYmGrmvNPUz_posts where post_type='attachment' GROUP BY post_parent) As b"), 'a.id','b.post_parent')	
	.innerJoin('ZUYmGrmvNPUz_term_relationships As tr', 'tr.object_id', 'a.ID')	
	.innerJoin('ZUYmGrmvNPUz_terms As ter', 'ter.term_id', 'tr.term_taxonomy_id')	
	.innerJoin('ZUYmGrmvNPUz_posts As c', 'c.post_parent', 'a.id')	
	.groupBy('a.post_title')
	.orderBy('a.post_date_gmt', 'desc')
	.limit(10)
	.toString();

	
	return responseFormat.Error(501,s,response);
	/*
	.then(function(rows){
		return responseFormat.Data(200,rows,response);
	})	
	.catch(function(err){		
		return responseFormat.Error(501,err.message,response);
	});
	*/
};

