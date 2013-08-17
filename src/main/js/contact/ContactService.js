define(function () {
	"use strict";

	var ContactService = function() {
		var message = {
			senderName: "",
			senderMail: "",
			text: ""
		};

		function sendMessage(message) {
			console.log("SendMessage called! Message: " + message);
		}

		return {
			message: message,
			sendMessage: sendMessage
		};
	};

	return ContactService;
});