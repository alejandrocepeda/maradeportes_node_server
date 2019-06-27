// auth.js
var logs            = require('./logs');
var db              = require('./db');
var responses       = require('./responses'); 
var service         = require('./service');

/*
exports.emailSignup = function(req, res) {  
    var user = new User({
        // Creamos el usuario con los campos
        // que definamos en el Schema
        // nombre, email, etc...
    });

    user.save(function(err){
        return res
            .status(200)
            .send({token: service.createToken(user)});
    });
};
*/


exports.emailLogin = function(request, response) {  

    var crypto      = require('crypto');
    var username    = request.body.username;
    var password    = request.body.password;
    var salt        = 'f#@V)Hu^%Hgfds';
    var hash        = crypto.createHash('sha1').update(salt + password).digest('hex');

    for (var i = 0; i < 1000; i++) {
        hash = crypto.createHash('sha1').update(hash).digest('hex');
    }

    db
    .select(
        'u.id_usuario AS id',
        'u.login AS userName',
        db.raw("CONCAT(u.nombre,' ',u.apellido) AS fullName")
    )
    .from('m_usuarios AS u')
    .where('u.login', username)
    .andWhere('u.clave', hash)
    .then(function(rows){
        
        if (rows.length > 0){    
            return response
                .status(200)
                .json({'status' : 'success','accessToken': service.createToken(rows[0].id), 'data ' : rows});    
        }   
        else{
            return response.status(401).json({'status' : 'error','message': 'username and passwird is not valid'});
        }

    })  
    .catch(function(err){
        logs.Error(err)
        return response.status(500).json({'xxx' : 'error','message': err.code});
    });
};
