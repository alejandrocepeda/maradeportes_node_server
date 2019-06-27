exports.Success = function(msg){
	console.log('\n\033[32m',msg,'\033[0m\n')
}

exports.Error = function (msg){
	console.log('\n\033[31m',msg,'\033[0m\n')
}

exports.Info = function (msg){
	console.log('\n\033[34m',msg,'\033[0m\n')
}

exports.Warning = function (msg){
	console.log('\n\033[33m',msg,'\033[0m\n')
}


