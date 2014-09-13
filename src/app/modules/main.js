(function (require) {
	"use strict";
	require.config({
		paths: {
			'angular': 'libs/angular/angular',
			'angular-route': 'libs/angular-route/angular-route',
			'angular-mocks': 'libs/angular-mocks/angular-mocks',
			'translate': 'libs/angular-translate/angular-translate',
			'translate-static-loader': 'libs/angular-translate-loader-static-files/angular-translate-loader-static-files',
			'translate-handler-log': 'libs/angular-translate-handler-log/angular-translate-handler-log'
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