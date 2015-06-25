define(['angular', 'config/config', 'angular-route', 'about/about', 'contact/contact', 'navbar/navbar', 'ngstart/ngstart', 'templates',
		"angular", "translate", "translate-static-loader", "translate-handler-log"],
	function (angular, config) {
	"use strict";

    var app = angular.module("app", config.default.standardAngularModules);

	app.config(['$httpProvider', '$routeProvider', '$translateProvider', function ($httpProvider, $routeProvider, $translateProvider) {
		$translateProvider.useStaticFilesLoader({
			prefix: 'translations/',
			suffix: '.json'
		});
		$translateProvider.determinePreferredLanguage();
		$translateProvider.useMissingTranslationHandlerLog();

		$routeProvider.otherwise({redirectTo: '/'});
	}]);

	return app;
});
