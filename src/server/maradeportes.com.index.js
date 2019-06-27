var express 	= require('express');  
var app 		= express();  
var fs 			= require('fs');
var http 		= require('https');
var url 		= require('url');
var deposits 	= require('./deposits');
var logs 		= require('./logs');
var push 		= require('./push');



var server 		= http.createServer({
  key    : fs.readFileSync('/home/maradeportes/sslcert/b0d01_c250d_6ba3a74df01ab174d71858fb4c7e22ee.key'),
  cert   : fs.readFileSync('/home/maradeportes/sslcert/maradeportes_com_b0d01_c250d_6ba3a74df01ab174d71858fb4c7e22ee.crt')
},app);

var users 	= require('./usuarios');

app.get('/api/users', (request, response) => {

	users.getUsuarios(function(rows,err){

		if (err){
			logs.Error(err)
			response.json({'message' : err})	
		}
	
		response.json(
			{
				'message' : 'success',
				'data'    : JSON.stringify(rows)
			}
		)	
	})
})

//GET
app.get('/channel/userdisconnect/id/:id', (request, response) => {
	var iduser = request.params.id;

	var db = require('./db');

	db('sockets_conections')
	.where('id_user', iduser)
	.then(function(rows){
		var socket_id = rows[0].socket_id;

    	db('sockets_conections')
		.where('id_user', iduser)
		.del()
		.then(function(resp){
			if (resp == 1){
				logs.Info("close-session-logout : " + socket_id);
    			response.json({'message' : 'close-session-logout','id' : socket_id})	
				ioServer.sockets.sockets[socket_id].emit('close-session-logout', {'message' : 'Desconectado'});		
			}
		})
    	
    	
	}).catch(function(err){
		logs.Error(err)
	});
})


//GET
app.get('/channel/:channel/id/:id', (request, response) => {
	
	var id 		= request.params.id
	var channel = request.params.channel;
	
	logs.Info(id)

	deposits.getDeposits(id,function(rows,err){

		if (err){
			logs.Error(err)
			response.json({'message' : err})	
		}

		
		logs.Warning('rows ' + rows);

		switch(channel){
			case 'admin-deposits-alert':
				push.sendNotification(socketsArray,'admin-deposits-alert',{'data' : rows,'message' : 'Verificar Deposito'})
				break
			case 'admin-retire-alert':
				push.sendNotification(socketsArray,'admin-retire-alert',{'data' : rows,'message' : 'Verificar Retiro'})
				break
			default:
				logs.Error('Error en la url')
				response.json({'message' : 'Error en la url'})
		}

		
		logs.Warning('Send notification OK')
		logs.Success(JSON.stringify(rows))
		response.json({'message' : 'Send push notification OK','id' : id})	
		
	})

})

/// sockets events
var ioServer 		= require('socket.io')(server),
	socketsArray = [];

ioServer.on('connection', function(socket){

	socket.on('disconnect', function() {		

		// section for socket into sales point
		// delete this socket on sockets_conections table
		var db = require('./db');
    	db('sockets_conections')
			.where('socket_id', socket.id)
			.del()
			.then(function(resp){
		    	logs.Info("delete socket_id : " + socket.id);
			}).catch(function(err){
				logs.Error(err)
			});
		/////

		var socketIndex = socketsArray.indexOf(socket);
	    logs.Info('socketID = %s got disconnected' + socket.id)
	    
	    if (~socketIndex) {
	    	socketsArray.splice(socketIndex, 1);
	    }
	})

	// event emiter for sales point
	socket.on('id_user', function(data){
		logs.Info('id_user: ' + data.id_user);

		var db = require('./db');

		db
			.select(
				db.raw('COUNT(*) AS total')
			)
			.from('sockets_conections')
			.where('id_user', data.id_user)
			.then(function(rows){
		    	var total_conection = rows[0].total;

		    	if (total_conection > 0){
		    		logs.Error('More of two open sessións ' + data.id_user + ', Total: ' + total_conection);

		    		socket.emit('user-close-session', {'message' : 'El usuario ya tiene una sesión abierta en otro dispositivo'});
		    	}
		    	else if (total_conection === 0){ // only one socket conection is allowed
			    	db('sockets_conections')
						.returning('socket_id')
						.insert({
							socket_id:socket.id,
							id_user:data.id_user
						})
						.then(function(socket_id){
					    	logs.Info(socket_id);
						})
						.catch(function(err){
							logs.Error(err)
							socket.emit('user-close-session', {'message' : 'El usuario ya tiene una sesión abierta en otro dispositivo'});
						});
				}	

			})
			.catch(function(err){
				logs.Error(err)
			});	
	})
	
	logs.Success('A new socket is connected! ' + socket.id)
	socketsArray.push(socket);
});

server.listen(3000, function(){
	logs.Success('Server iniciadado en el puerto 3000');

	// delete all rows on sockets conections table
	var db = require('./db');

	db('sockets_conections')			
			.del()
			.then(function(resp){
		    	logs.Info("delete all sockets ");
			}).catch(function(err){
				logs.Error(err)
			});
})
