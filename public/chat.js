window.onload = function() {
	console.log('test')
	var messages = [];
	var socket = io.connect('http://localhost:3700');
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");
	var content = document.getElementById("content");
	var name = document.getElementById("name");

	socket.on('message', function (data) {
		console.log('message found')
		if(data.message) {
			console.log('Fire!!!')
			messages.push(data);
			console.log(messages.length)
			var html = '';
			for(var i=0; i<messages.length; i++) {
				console.log(messages[i].username)
				html = html + '<b>' + (messages[i].username ? messages[i].username : 'Server') + ':</b>';
				html = html + messages[i].message + '<br />';
				console.log(html)
//				html += messages[i] + '<br />';
			}
			content.innerHTML = html; 
		} else { 
			console.log("There is a problem:", data);
		}
	});

	sendButton.onclick = function() {
		console.log('test send')
		if(name.value == "") {
			alert("Please type your name!");
		} else { 
		var text = field.value; 
		socket.emit('send', {message: text, username: name.value});
		console.log('test sent')
	}
};
}

