define(['angular', 'about/AboutController' ], function (angular, AboutController) {
	"use strict";

	var about = angular.module("about", []);
	about.controller("aboutController", AboutController);

	return about;
});