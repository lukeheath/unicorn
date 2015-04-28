/**
 * ProfileCtrl
 *
 * @type {angular.controller}
 * @module  unicorn
 * @description  The UI controller for the user profile
 *
 *               ## Primary responsibilities:
 *               - Set scope for viewing profile
 *               - Logic for updating profile
 *
 */

angular.module('unicorn')
.controller('ProfileCtrl', [
        '$scope', '$rootScope', '$state', '$timeout', 'uiMe', 'uiList', 'uiErrorBus',
function($scope, $rootScope, $state, $timeout, uiMe , uiList, uiErrorBus) {

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // When the application is initially rendered
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  //

  //uiMe.syncing.form = true;uiM

  if(!uiMe.id){
    //$state.go('login');
  }

  $scope.uiMe = uiMe;

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // DOM Events
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

  $scope.intent = angular.extend($scope.intent||{}, {


  });

}]);
