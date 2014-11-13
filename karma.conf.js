/*global module: true */
module.exports = function (config) {
	"use strict";
	config.set({
		basePath: '.',

		files: [
			'test/main-test.js',
			{pattern: 'bower_components/**/*.js', included: false},
			{pattern: 'test/unit/**/*.js', included: false},
			{pattern: 'app/modules/**/*.js', included: false}

		],

		autoWatch: false,

		frameworks: ['jasmine', 'requirejs'],

		browsers: ['Chrome'],

		plugins: [
			'karma-requirejs',
			'karma-jasmine',
			'karma-chrome-launcher'
		]

	});
};