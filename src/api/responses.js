exports.successData = function(rows,response){
	return response.status(200).json({'status' : 'success','data' : rows});
};

exports.success = function(response,msg){
	return response.status(200).json({'status' : 'success','message': msg});
};

exports.badRequest = function(rows,response){
	return response.status(400).json({'status' : 'error','message': 'Bad request'});
};

exports.notFound = function(rows,response,resourceName){
	return response.status(404).json({'status' : 'error','message': 'Resource ' + resourceName + ' not found'});
};


exports.serverError = function(rows,response,err){
	return response.status(500).json({'status' : 'error','message': err.code});
};
