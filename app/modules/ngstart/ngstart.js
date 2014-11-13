define(['angular', 'ngstart/NgStartController'], function (angular, NgStartController) {
	"use strict";

	var ngstart = angular.module("ngstart", ['ngRoute']);

	ngstart.config(["$routeProvider", function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'modules/ngstart/ngstart.html',
			controller: NgStartController
		});

	}]);

	return ngstart;
});