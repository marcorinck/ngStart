define(['angular', 'about/AboutController' ], function (angular, AboutController) {
	"use strict";

	var about = angular.module("about", []);

	about.config(["$routeProvider", function($routeProvider) {
		$routeProvider.when('/about/', {
			templateUrl: "modules/" + 'about/about.html',
			controller: AboutController
		});

	}]);

	return about;
});