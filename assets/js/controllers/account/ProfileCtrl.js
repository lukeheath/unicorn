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

  $rootScope.appReady.then(function onReady(){
    if(!uiMe.id){
      $state.go('login');
    }
  });

  $scope.uiMe = uiMe;

  // Set profile edit status on scope
  $scope.editProfile = false;

  // Copy user data for form
  // (we don't want to bind inputs to uiMe directly)
  $scope.user = {
    username: uiMe.username,
    email: uiMe.email
  };

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // DOM Events
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

  $scope.intent = angular.extend($scope.intent||{}, {

    editProfile: function(){
      $scope.editProfile = true;
    },

    updateProfile: function(){
      uiMe.syncing.form = true;
      uiMe.updateProfile($scope.user)
      .then(function onResponse(){
        $scope.editProfile = false;
        uiMe.syncing.form = false;
      })
    }

  });

}]);
