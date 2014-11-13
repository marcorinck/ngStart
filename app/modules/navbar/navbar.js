define(['angular', 'navbar/NavbarController'], function (angular, NavbarController) {
	"use strict";

	var navbar = angular.module("navbar", []);
	navbar.controller("navbarController", NavbarController);

	return navbar;
});