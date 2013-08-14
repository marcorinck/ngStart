define(['angular', 'routes', 'about/about' ], function (angular, routes) {
	"use strict";
	var app = angular.module("app", ["about"]);


	app.run(['$rootScope', function () {
		app.config(['$httpProvider', function ($httpProvider) {
			var httpLogInterceptor;

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
	}]);

	return app;
});
