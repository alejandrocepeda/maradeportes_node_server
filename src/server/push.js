sendNotification = function(array,channel,data){
	
	array.forEach(function(tmpSocket) {
		tmpSocket.volatile.emit(channel, data);
	});
}

exports.sendNotification = sendNotification;