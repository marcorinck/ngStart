define(['angular', 'contact/ContactController', 'contact/ContactService' ], function (angular, ContactController, ContactService) {
	"use strict";

	var contact = angular.module("contact", []);
	contact.controller("contactController", ContactController);
	contact.service("ContactService", ContactService);

	return contact;
});