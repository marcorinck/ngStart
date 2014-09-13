
angular.module('about', ['about.controller'])

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('main.about', {
        url: "/about",
        templateUrl: "modules/about/about.html",
        controller: 'AboutController'
      })
  });

