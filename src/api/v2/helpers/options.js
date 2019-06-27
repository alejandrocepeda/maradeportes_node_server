var responseFormat  = require('./responseFormat');
var getOption  		= require('./getOption');

exports.geHelpers = function(callback){

	var helper = require('./getOption');

	helper.geOption('user_country',function(r) {
	    global.userCountry = r;

	    callback();
	 });
};

