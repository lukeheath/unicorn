/**
 * AppCtrl
 *
 * @type {angular.controller}
 * @module  unicorn
 * @description  The UI container for the application experience.
 *
 *               ## Primary responsibilities:
 *               Set a global scope
 *
 */

angular.module('unicorn')
.controller('AppCtrl',
function($scope, $rootScope, $state, $q, $mdSidenav, $mdTheming, uiDirector, uiMe, uiList, uiErrorBus) {

  // Set objects to window for easy debugging
  // DEV ONLY
  window.ui = {
    theme: $mdTheming,
    me: uiMe,
    director: uiDirector
  };

  // Set uiMe to scope
  $scope.uiMe = uiMe;

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // When the application is initially rendered
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

  // Make colors available to templates for SVG icons
  $scope.mdColors = {
    primary: '#673AB7',
    accent: '#EC407A'
  };

  // Get current user
  uiMe.fetch()
  .then(function loggedIn(){

    // Attempt to initialize app
    uiDirector.init();

  }).catch(function notLoggedIn(err){

    // Resolve loading state without initializing app
    uiDirector.appReady.resolve();

  });

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // DOM Events
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    $scope.intent.closeSidenav();
  });

  $scope.intent = angular.extend($scope.intent||{}, {

    toggleSidenav: function(navTarget){
      if(navTarget === 'links'){
        $mdSidenav('links').toggle();
        $mdSidenav('account').close();
      }
      else if(navTarget === 'account'){
        $mdSidenav('account').toggle();
        $mdSidenav('links').close();
      }
    },

    closeSidenav: function(){
      $mdSidenav('links').close();
      $mdSidenav('account').close();
    }

  });

});
