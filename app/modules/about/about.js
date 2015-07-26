import angular from 'angular';
import AboutController from 'about/AboutController.js';
import 'angular-route';

let about = angular.module("about", ['ngRoute']);

about.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when('/about/', {
        templateUrl: "modules/" + 'about/about.html',
        controller: AboutController
    });

}]);

