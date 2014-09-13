var app = angular.module('app',["ui.router"]);


app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/main");

  $stateProvider
    .state('main', {
      url: "/main",
        templateUrl: "modules/main/layout.html",
        controller: function($scope) {
      }
    })
});

