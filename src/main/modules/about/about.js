define(['angular', 'about/AboutController' ], function (angular, AboutController) {
	"use strict";

	var about = angular.module("about", ["ngRoute"]);

//	about.config(["$routeProvider", function($routeProvider) {
//		$routeProvider.when('/about/', {
//			templateUrl: "modules/" + 'about/about.html',
//			controller: AboutController
//		});
//
//	}]);

	about.config(["$routeProvider", function($routeProvider) {
		$routeProvider.when('/about/', {
			templateUrl: "modules/" + 'about/about.html',
			controller: AboutController
		});
	}]);

	return about;
});