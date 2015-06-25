//jshint module:true
import angular from 'angular';
import NgStartController from 'ngstart/NgStartController';

angular.module("ngstart", ['ngRoute'])
	.config(["$routeProvider", ($routeProvider) => {
		$routeProvider.when('/', {
			templateUrl: 'modules/ngstart/ngstart.html',
			controller: NgStartController,
			controllerAs: 'ngStart'
		});
	}]);
