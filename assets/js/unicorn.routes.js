angular.module('unicorn')

// Configure UI Router
.config([
  '$stateProvider',
  '$urlRouterProvider',

  function ($stateProvider, $urlRouterProvider) {

    $stateProvider

    /******************************
    * Configure state machine
    *******************************/

    .state('home', {
      url: '/',
      templateUrl: 'templates/brochure/home.html',
      controller: 'AppCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/account/login.html',
      controller: 'LoginCtrl'
    });

    /******************************
    * Standard url routing
    *******************************/

    $urlRouterProvider

    .otherwise('/');
  }
]);

