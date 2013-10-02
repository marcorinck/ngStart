(function (require) {
	"use strict";
	require.config({
		paths:{
			'angular':'../../../bower_components/angular/angular',
			'angular-route':'../../../bower_components/angular-route/angular-route',
			'translate': '../../../bower_components/angular-translate/angular-translate',
			'translate-static-loader': '../../../bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files',
			'translate-handler-log': '../../../bower_components/angular-translate-handler-log/angular-translate-handler-log'
		},
		shim:{
			'angular':{ deps:[], exports:'angular' },
			'angular-route': {deps: ['angular']},
			'translate': {deps: ['angular']},
			'translate-static-loader': {deps: ['translate']},
			'translate-handler-log': {deps: ['translate']}
		}
	});

	require([
		"angular", "angular-route", "translate", "translate-static-loader", "translate-handler-log", "app"
	], function(angular) {
		angular.bootstrap(document, ["app"]);
	});
}(require));