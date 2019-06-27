var db          = require('../db');
var uniqid          = require('uniqid');
var crypto          = require('crypto');
var validator       = require('email-validator');
var functions       = require('../functions');
var responseFormat  = require('../responseFormat');
//var options         = require('../helpers/options');
var getOption = require('../helpers/getOption');

//var getOption       = require('./getOption');

global.config   = require('../languages/es.js');


var options = function(){
    
    return new Promise(function(resolve,reject) {


        db
        .select(
            'p.value AS value'
        )
        .from('opciones AS p')      
        .where('p.name', 'user_country')        
        .then(function(value){
            console.log('1'); 
            global.userCountry = 'CO';
            resolve();
        })  
        .catch(function(err){       
            return responseFormat.Error(501,err.message,response);  
        });
    })
};

var postRegister = function(request,response){
    
    var firstName           = request.body.firstname;
    var lastName            = request.body.lastname;
    var identificationId    = request.body.identificationid;
    var phoneNumber         = request.body.phonenumber;
    var email               = request.body.email;
    var password            = request.body.password;
    var registerToday       = new Date();

    var hash                = crypto.createHash('sha1').update(uniqid()).digest('hex');
    var res                 = hash.substring(0, 6);
    var user_country        = global.userCountry;
    console.log('2'); 
    var username            = user_country + res.toUpperCase();

    var isError = false;

    //=======================
    if (!functions.isset(firstName)){                
        return responseFormat.Error(500,global.config.register.first_name_undefined,response);
    }
    else if (!functions.isset(lastName)){                
        return responseFormat.Error(500,global.config.register.last_name_undefined,response);
    }
    else if (!functions.isset(identificationId)){                
        return responseFormat.Error(500,global.config.register.identification_id_undefined,response);
    }
    else if (!functions.isset(phoneNumber)){                
        return responseFormat.Error(500,global.config.register.phone_number_undefined,response);
    }
    else if (!functions.isset(email)){                
        return responseFormat.Error(500,global.config.register.email_undefined,response);
    }
    else if (!functions.isset(password)){                
        return responseFormat.Error(500,global.config.register.password_undefined,response );
    }
    else{        
        validator.validate_async(email, function(err, isValidEmail) {
            if (!isValidEmail){                                
                return responseFormat.Error(500,global.config.register.the_email_is_invalid,response);
            }
        }); 
    }
    
    return responseFormat.Success(200,global.config.register.user_register_is_complete + ' ' + user_country,response);
}


exports.Register = function(request,response){
    options()
    .then(postRegister(request,response))    
    .catch(function(err){
         console.log('Error ' + err.message)
    })
}
