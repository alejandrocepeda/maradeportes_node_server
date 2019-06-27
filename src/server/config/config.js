module.exports = function (inifile) {
  	var iniparser = require('iniparser');
		iniparser.parse(inifile, function(err,config){
		return config;
	});
};