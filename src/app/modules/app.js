var app = angular.module('app',['ui.router','main','home','about']);


app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/main");

});