define(function () {
	"use strict";

	var ContactController = function($scope, contactService, config) {
		$scope.author = "Marco Rinck";
		$scope.email = "marco.rinck@googlemail.com";
		$scope.homepage = "https://github.com/marcorinck/ngStart";
		$scope.message = contactService.message;

		$scope.messageChanged = function() {
			$scope.sent = false;
		};

		$scope.sendMessage = function() {
			contactService.sendMessage();
			$scope.sent = true;
		};

		$scope.system = config.system;
	};

	ContactController.$inject = ["$scope", 'ContactService', 'config'];

	return ContactController;
});