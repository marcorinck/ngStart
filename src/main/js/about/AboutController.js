define(function () {
	"use strict";

	var AboutController = function($scope) {
		$scope.about = "This is sample about from angular.AboutController";
	};

	AboutController.$inject = ["$scope"];

	return AboutController;
});