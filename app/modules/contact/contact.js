//jshint module: true
import angular from 'angular';
import ContactController from 'contact/ContactController.js';
import ContactService from 'contact/ContactService.js';

let contact = angular.module("contact", ['ngRoute']);

contact.service("ContactService", ContactService);

contact.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when('/contact/', {
        templateUrl: "modules/" + 'contact/contact.html',
        controller: ContactController
    });
}]);