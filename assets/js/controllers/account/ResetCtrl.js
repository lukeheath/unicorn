/**
 * ResetCtrl
 *
 * @type {angular.controller}
 * @module  unicorn
 * @description  The UI controller for resetting forgotten passwords
 *
 *               ## Primary responsibilities:
 *               Reset user passwords if they have an authToken
 *
 */

angular.module('unicorn')
.controller('ResetCtrl',
function($scope, $rootScope, $state, $stateParams, $timeout, uiMe , uiList, uiErrorBus) {

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // When the application is initially rendered
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

  // Get the auth token
  var authToken = $stateParams.authToken;

  // If not auth token, 
    // go home
    if(!authToken){
      $state.go('public.home');
    }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // DOM Events
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

  $scope.intent = angular.extend($scope.intent||{}, {

    // Reset password using auth token
    resetPassword: function(){
      uiMe.syncing.form = true;
      uiMe.resetPassword($scope.user.password, authToken)
      .then(function onSuccess(){

        uiMe.authenticate(authToken)
        .then(function onAuth(){
          uiMe.fetch()
          .then(function onFetched(){
            $state.go('app.profile');
          });
        })
        .catch(function onError(err){
          uiErrorBus.$handleError(err);
        })

      })
      .finally(function eitherWay(){
        uiMe.syncing.form = false;
        $scope.status = "If " + $scope.email + " is a valid user, a password recovery email has been sent.";
        $scope.email = "";

        $scope.reminderDone = true;

      });

    }

  });

});
