var app = angular.module('app',['ui.router','main','home']);


app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/main");

});

