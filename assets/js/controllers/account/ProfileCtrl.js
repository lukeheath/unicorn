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
  
  // Set profile edit status on scope
  $scope.editProfile = false;

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // DOM Events
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

  $scope.intent = angular.extend($scope.intent||{}, {

    editProfile: function(){
      $scope.editProfile = true;

      // Copy user data for form input data model
      // (we don't want to bind inputs to uiMe directly)
      $scope.user = {
        username: uiMe.username,
        email: uiMe.email,
        currentPassword: "",
        newPassword: ""
      };
    },

    updateProfile: function(){
      uiMe.syncing.form = true;

      if($scope.user.newPassword.length < 6){
        $scope.user.newPassword = 'null';
      }

      uiMe.updateProfile($scope.user)
      .then(function onResponse(){
        $scope.editProfile = false;
        uiMe.syncing.form = false;
      })
      .catch(function onError(){
        // If this is a client error,
        // provide the error message
        if(err.data.status >= 400 && err.data.status < 500){
          // Loop through invalidAttributes object in case there are multiple
          // although currently Treeline returns the first invalid attribute only
          _.forEach(err.data.invalidAttributes, function(attributeObject, key){
            uiErrorBus.$handleError(attributeObject[0].message);
          });
        }
        // Else a server error,
        // provide the full error object
        else{
          uiErrorBus.$handleError(err);
        }
      })
      
    }

  });

}]);
