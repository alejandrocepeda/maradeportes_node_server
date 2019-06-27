var jwt	= require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config');

exports.ensureAuthenticated = function(request,response,next){
	// check header or url parameters or post parameters for token
  var token = request.body.token || request.query.token || request.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.TOKEN_SECRET, function(err, decoded) {      
      if (err) {
        return response.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        request.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return response.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
}