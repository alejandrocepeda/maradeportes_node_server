var fs 		= require('fs');
var url 	= require('url');
var http 	= require('https');

var deposits = require('./deposits');

var options = {
  key    : fs.readFileSync('/home/maracom/ssl/keys/9b9f3_16f2d_eca10f71fef79e112e54fac49b39ad65.key'),
  cert   : fs.readFileSync('/home/maracom/ssl/certs/_wildcard__maradeportes_com_9b9f3_16f2d_1485783162_925ba800a9628db02172458dea990d62.crt')
};

var server =  http.createServer(options, (request,response) => {
	var query = url.parse(request.url,true).query;
	

	if (query.action !== 'undefined' && query.type !== 'undefined'){
		if (query.action == 'push' && query.type == 'deposit'){
			
			if (query.id !== 'undefined'){
	
				deposits.getDeposits(query.id,socketsArray)
			}

			response.statusCode = 404
			response.end('Send push notification OK')	
		}
	}
});

var ioServer 		= require('socket.io')(server),
	socketsArray = [];

ioServer.on('connection', function(socket){

	socket.on('disconnect', function() {		

		var socketIndex = socketsArray.indexOf(socket);
	    console.log('socketID = %s got disconnected' + socket.id);
	    
	    if (~socketIndex) {
	    	socketsArray.splice(socketIndex, 1);
	    }
	})
	
	console.log('A new socket is connected! ' + socket.id);
	socketsArray.push(socket);
});


server.listen(3000, function(){
	console.log('Server iniciadado en el puerto 3000')
})
