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
.controller('AppCtrl', [
        '$scope', '$rootScope', '$state', '$mdSidenav', 'uiMe', 'uiList', 'uiErrorBus',
function($scope, $rootScope, $state, $mdSidenav, uiMe, uiList, uiErrorBus) {

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // When the application is initially rendered
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

  // Fetch current user data from server
  // uiMe.fetch()
  // .then(function (){

  //   // Fetch widgets from server
  //   uiList.fetch({
  //     belongingTo: uiMe.id
  //   });

  // }).catch(function (err){
  //   // e.g. if err.status is 401/403, redirect to login.
  //   if (err.status < 404 && err.status > 400) {
  //     window.location = foo;
  //     return;
  //   }

  //   // If the error is unknkown, use a catch-all like `uiErrorBus`.
  //   // (for simplicity, just using `console.error()` here)
  //   console.error(err);
  // });

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // DOM Events
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

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
    }

  });

}]);
