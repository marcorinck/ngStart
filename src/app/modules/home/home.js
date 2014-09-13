
angular.module('home', ['home.controller'])

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('main.home', {
        url: "/home",
        templateUrl: "modules/home/layout.html",
        controller: 'HomeController'
      })
  });

