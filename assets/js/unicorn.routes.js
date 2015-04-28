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
      controller: 'HomeCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/account/login.html',
      controller: 'LoginCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/account/signup.html',
      controller: 'SignupCtrl'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'templates/account/profile.html',
      controller: 'ProfileCtrl'
    });

    /******************************
    * Standard url routing
    *******************************/

    $urlRouterProvider

    .otherwise('/');
  }
]);

