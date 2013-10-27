(function (require) {
	"use strict";
	require.config({
		paths: {
			'angular': '../../../bower_components/angular/angular',
			'angular-mocks': '../../../bower_components/angular-mocks/angular-mocks',
			'translate': '../../../bower_components/angular-translate/angular-translate',
			'translate-static-loader': '../../../bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files',
			'translate-handler-log': '../../../bower_components/angular-translate-handler-log/angular-translate-handler-log'
		},
		shim: {
			'angular': { deps: [], exports: 'angular' },
			'translate': {deps: ['angular']},
			'translate-static-loader': {deps: ['translate']},
			'translate-handler-log': {deps: ['translate']},
			'angular-mocks': {deps: ['angular']}
		}
	});

	require(["config/config"], function (config) {

		require(config.standardRequireModules, function (angular) {
			angular.bootstrap(document, ["app"]);
		});
	});
}(require));