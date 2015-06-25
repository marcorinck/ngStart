(function(System) {
	"use strict";

	System.config({
		baseURL: '/app/modules',
		transpiler: 'babel',
		// or traceurOptions or typescriptOptions
		defaultJSExtensions: true,
		babelOptions: {

		},
		map: {
			angular: '../../../bower_components/angular/angular',
			'angular-route': '../../../bower_components/angular-route/angular-route',
			'angular-mocks': '../../../bower_components/angular-mocks/angular-mocks',
			'translate': '../../../bower_components/angular-translate/angular-translate',
			'translate-static-loader': '../../../bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files',
			'translate-handler-log': '../../../bower_components/angular-translate-handler-log/angular-translate-handler-log',
			'babel': '../../../node_modules/babel-core/browser.js'
		},
		meta: {
			'angular': { deps: [], exports: 'angular' },
			'translate': {deps: ['angular']},
			'translate-static-loader': {deps: ['translate']},
			'translate-handler-log': {deps: ['translate']},
			'angular-route': {deps: ['angular']},
			'angular-mocks': {deps: ['angular']}
		}
	});

	System.import("app").then(function() {
		angular.bootstrap(document, ["app"]);
	});
})(window.System);

