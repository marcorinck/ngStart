define(['angular', 'config/config', 'angular-route', 'about/about', 'contact/contact', 'navbar/navbar'], function (angular, config) {
	"use strict";

    var app = angular.module("app", config.standardAngularModules);

	app.config(['$httpProvider', '$routeProvider', '$translateProvider', function ($httpProvider, $routeProvider, $translateProvider) {
		var httpLogInterceptor;

		$translateProvider.useStaticFilesLoader({
			prefix: 'modules/translations/locale-',
			suffix: '.json'
		});
		$translateProvider.preferredLanguage('en');
		$translateProvider.useMissingTranslationHandlerLog();

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
