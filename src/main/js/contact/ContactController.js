define(function () {
	"use strict";

	var ContactController = function($scope, contactService) {
		$scope.author = "Marco Rinck";
		$scope.email = "marco.rinck@googlemail.com";
		$scope.message = contactService.messsage;

		$scope.sendMessage = function() {
			contactService.sendMessage();
		}
	};

	ContactController.$inject = ["$scope", 'ContactService'];

	return ContactController;
});