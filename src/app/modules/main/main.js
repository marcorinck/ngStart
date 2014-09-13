
angular.module('main', ['main.controller'])

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('main', {
        url: "/main",
        templateUrl: "modules/main/layout.html",
        controller: 'MainController'
      })
  });

