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

    /*
    Public
    - Public access, all users
    */

    .state('public', {
      abstract: true,
      resolve: {
        appReady: function(uiDirector){
          return uiDirector.appReady.promise;
        }
      },
      onEnter: function(uiMe){
        // Update syncing state
        uiMe.syncing.app = false;
      }
    })
    .state('public.home', {
      url: '/',
      views: {
        '@': {
          templateUrl: 'templates/brochure/home.html',
          controller: 'HomeCtrl'
        }
      }
    })

    /*
    Account states
    (No auth required)
    */

    .state('account', {
      abstract: true,
      resolve: {
        appReady: function(uiDirector){
          return uiDirector.appReady.promise;
        }
      },
      onEnter: function($state, uiMe){

        // Update syncing state
        uiMe.syncing.app = false;

        // If user is logged in,
        // redriect to profile
        if(uiMe.id){
          $state.go('app.profile');
        }
        
      }
    })
    .state('account.login', {
      url: '/login',
      views: {
        '@': {
          templateUrl: 'templates/account/login.html',
          controller: 'LoginCtrl'
        }
      }
    })
    .state('account.forgot', {
      url: '/forgot',
      views: {
        '@': {
          templateUrl: 'templates/account/forgot.html',
          controller: 'ForgotCtrl'
        }
      }
    })
    .state('account.reset', {
      url: '/reset/:authToken',
      views: {
        '@': {
          templateUrl: 'templates/account/reset.html',
          controller: 'ResetCtrl'
        }
      }
    })
    .state('account.signup', {
      url: '/signup',
      views: {
        '@': {
          templateUrl: 'templates/account/signup.html',
          controller: 'SignupCtrl'   
        }
      }
    })

    /*
    Application states
    (Auth required)
    */
    .state('app', {
      abstract: true,
      resolve: {
        appReady: function(uiDirector){
          return uiDirector.appReady.promise;
        }
      },
      onEnter: function($state, uiMe){

        // Update syncing state
        uiMe.syncing.app = false;

        // If user is not logged in,
        // redriect to login
        if(!uiMe.id){
          $state.go('account.login');
        }
        
      }
    })
    .state('app.profile', {
      url: '/profile',
      views: {
        '@': {
          templateUrl: 'templates/account/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })

    /******************************
    * Standard url routing
    *******************************/

    $urlRouterProvider

    .otherwise('/');
  }
]);

