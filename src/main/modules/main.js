(function (require) {
	"use strict";
	require.config({
		paths: {
			'angular': '../../../bower_components/angular/angular',
			'angular-route': '../../../bower_components/angular-route/angular-route',
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
			'angular-route': {deps: ['angular']},
			'angular-mocks': {deps: ['angular']}
		}
	});

	require(["angular", "translate", "translate-static-loader", "translate-handler-log", "config/config", "app"], function () {
		angular.bootstrap(document, ["app"]);
	});
}(require));