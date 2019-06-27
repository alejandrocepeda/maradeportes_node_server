exports.Error = function(httpCode,message,response){

	return response.status(httpCode).json(
		{
			'status' 	: 'error',
			'message'	: message
		}
	);
}  

exports.Success = function(httpCode,message,response){
	
	return response.status(httpCode).json(
		{
			'status' 	: 'success',
			'message'	: message
		}
	);
}  

exports.Data = function(httpCode,data,response){
	
	return response.status(httpCode).json(
		{
			'status' 	: 'success',
			'data'		: data
		}
	);
} 

exports.Custom = function(httpCode,arrayData,response){
	
	return response.status(httpCode).json(
		arrayData
	);
} 