window.onload = function() {
	var messages = [];
	var socket = io.connect('http://localhost:3700');
	var field = document.getElementById("field");
	var sendButton = document.getElementById("Send");
	var content = document.getElementById("content");
	var name = document.getElementById("name");

	socket.on('message', function (data) {
		if(data.message) {
			messages.push(data);
			var html = '';
			for(var i=0; i<messages.lenght; i++) {
				html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ':</b>';
				html += messages[i].messages + '<br />';
//				html += messages[i] + '<br />';
			}
			content.innerHTML = html; 
		} else { 
			console.log("There is a problem:", data);
		}
	});

	sendButton.onclick = function() {
		if(name.value == "") {
			alert("Please type your name!");
		} else { 
		var text = field.value; 
		socket.emit('send', {message: text, username: name.value});
	}
};
}

