define(function () {
	"use strict";

	var ContactController = function($scope, contactService) {
		$scope.author = "Marco Rinck";
		$scope.email = "marco.rinck@googlemail.com";
		$scope.homepage = "https://github.com/marcorinck/angular-template-project";
		$scope.message = contactService.messsage;
		$scope.page = "contact";
		$scope.message = contactService.message;

		$scope.messageChanged = function() {
			$scope.sent = false;
		};

		$scope.sendMessage = function() {
			contactService.sendMessage();
			$scope.sent = true;
		};
	};

	ContactController.$inject = ["$scope", 'ContactService'];

	return ContactController;
});