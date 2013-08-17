define(function () {
	"use strict";

	var NavbarController = function($scope, $location) {
		$scope.isActive = function(page) {
			var currentPage = $location.path();

			return currentPage === page;
		};
	};

	NavbarController.$inject = ["$scope", '$location'];

	return NavbarController;
});