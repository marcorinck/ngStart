(function(System) {
	"use strict";

	//this file is NOT run through ES6 transpiler, so no ES6 features can't be used (like spreading of arguments in final
	//importing/loading of modules

	System.config({
		baseURL: '/app/modules',
		transpiler: 'babel',
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

	Promise.all(['angular', 'app', 'translate', 'translate-static-loader', 'translate-handler-log'].map(function(x) {
		return System.import(x);
	})).then( function(modules) {
		modules[0].bootstrap(document, ["app"]);
	});
})(window.System);

