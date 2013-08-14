(function (window, require) {
	"use strict";
	var file, requireModules;
	requireModules = [];

	//load all test files whose file names end with "*Test" automatically via requireJS
	for (file in window.__karma__.files) {
		if (window.__karma__.files.hasOwnProperty(file)) {
			if (file.substring(file.length - 7, file.length) === 'Test.js') {
				requireModules.push(file);
			}
		}
	}

	requireModules.push("app");

	//angular-mocks
	requireModules.push("mocks");

	require({
		// "/base" ist die URL von der Karma alle Dateien ausliefert,
		// "src/main/js" ist due Base-URL aller Module die nicht Test sind
		baseUrl:'/base/src/main/js',
		paths:{
			'angular':'/base/bower_components/angular/angular',
			'mocks':'/base/bower_components/angular-mocks/angular-mocks'
		},
		shim:{
			'angular':{ deps:[], exports:'angular' },
			'mocks':{ deps:['angular'], exports:'mocks' }
		}
	}, requireModules, function () {
		window.__karma__.start();
	}, function (err) {
		var failedModules = err.requireModules;
		console.log("err", err);

		if (failedModules && failedModules[0]) {
			throw new Error("Module couldn't be loaded: " + failedModules);
		} else {
			throw new Error("Unkown error:" + err);
		}
	});
}(window, require));