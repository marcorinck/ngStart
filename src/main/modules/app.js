define(['angular', 'config/config', 'angular-route', 'about/about', 'contact/contact', 'navbar/navbar', 'ngstart/ngstart'],
	function (angular, config) {
	"use strict";

    var app = angular.module("app", config.standardAngularModules);

	app.config(['$httpProvider', '$routeProvider', '$translateProvider', function ($httpProvider, $routeProvider, $translateProvider) {
		$translateProvider.useStaticFilesLoader({
			prefix: 'modules/translations/locale-',
			suffix: '.json'
		});
		$translateProvider.preferredLanguage('en');
		$translateProvider.useMissingTranslationHandlerLog();

		$routeProvider.otherwise({redirectTo: '/'});
	}]);

	return app;
});
