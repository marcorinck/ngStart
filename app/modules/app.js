//jshint module:true
import angular from 'angular';
import config from 'config/config';
import 'angular-route';
import 'about/about';
import 'contact/contact';
import 'navbar/navbar';
import 'ngstart/ngstart';
import 'templates';

angular.module("app", config.standardAngularModules)
	.config(['$httpProvider', '$routeProvider', '$translateProvider', ($httpProvider, $routeProvider, $translateProvider) => {
		$translateProvider.useStaticFilesLoader({
			prefix: 'translations/',
			suffix: '.json'
		});
		$translateProvider.determinePreferredLanguage();
		$translateProvider.useMissingTranslationHandlerLog();

		$routeProvider.otherwise({redirectTo: '/'});
	}]);