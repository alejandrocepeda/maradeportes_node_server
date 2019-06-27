var db              = require('../db');
var config          = require('../config');
var crypto          = require('crypto');
var jwt             = require('jsonwebtoken');
var responseFormat  = require('../responseFormat');
var functions       = require('../functions');

global.config   = require('../languages/en.js');

exports.Authenticate = function(request,response){

    var username    = request.body.username;
    var password    = request.body.password;

    if (!functions.isset(username)){        
        return responseFormat.Error(500,global.config.auth.username_undefined,response);
    }
    else if (!functions.isset(password)){        
        return responseFormat.Error(500,global.config.auth.password_undefined,response);
    }

    //=================================================

    var salt        = 'f#@V)Hu^%Hgfds';
    var hash        = crypto.createHash('sha1').update(salt + password).digest('hex');

    for (var i = 0; i < 1000; i++) {
        hash = crypto.createHash('sha1').update(hash).digest('hex');
    }

    db
    .select(
        'u.id_usuario AS id',
        'u.login AS name',
        db.raw("CONCAT(u.nombre,' ',u.apellido) AS fullName")
    )
    .from('m_usuarios AS u')
    .where('u.login', username)
    .andWhere('u.clave', hash)
    .then(function(user){
        
        if (!user) {        	
            return responseFormat.Error(500,global.config.auth.authentication_failed,response);
        }
        else if (user.length > 0){    
    	
            var token = jwt.sign(user[0], config.TOKEN_SECRET, {
              expiresIn: 60*60*24 
            });

            // return the information including token as JSON	            
            return responseFormat.Custom(200,{'status' : 'error','message': global.config.auth.enjoy_your_token,'token': token,'data' : user},response);
        }   
        else{            
            return responseFormat.Error(500,global.config.auth.authentication_failed,response);
        }

    })  
    .catch(function(err){        
        return responseFormat.Error(501,err.message,response);
    });
}