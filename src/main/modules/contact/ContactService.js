define(function () {
	"use strict";

	var ContactService = function() {
		var message = {
			senderName: "",
			senderMail: "",
			text: ""
		};

		function sendMessage() {
			console.log("SendMessage called! Message: " + message.text);
		}

		return {
			message: message,
			sendMessage: sendMessage
		};
	};

	return ContactService;
});