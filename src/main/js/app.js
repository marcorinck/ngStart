define(['angular', 'about/about', 'contact/contact' ], function (angular) {
	"use strict";
	var app = angular.module("app", ["about", "contact"]);

	app.config(['$httpProvider', '$routeProvider', function ($httpProvider, $routeProvider) {
		var httpLogInterceptor;

		$routeProvider.when('/about/', {
			templateUrl: 'about.html',
			controller: "aboutController"
		});
		$routeProvider.when('/contact/', {
			templateUrl: 'contact.html',
			controller: "contactController"
		});

		$routeProvider.otherwise({redirectTo: '/about/'});

		httpLogInterceptor = ['$q', function ($q) {

			function success(response) {
				console.log("Successful HTTP request. Response:", response);
				return response;
			}

			function error(response) {
				console.log("Error in HTTP request. Response:", response);

				return $q.reject(response);
			}

			return function (promise) {
				return promise.then(success, error);
			};
		}];

		$httpProvider.responseInterceptors.push(httpLogInterceptor);
	}]);

	return app;
});
