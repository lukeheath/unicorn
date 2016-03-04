/**
 * ForgotCtrl
 *
 * @type {angular.controller}
 * @module  unicorn
 * @description  The UI controller for forgot password
 *
 *               ## Primary responsibilities:
 *               Reminding users of their passwords
 *
 */

angular.module('unicorn')
.controller('ForgotCtrl', [
        '$scope', '$rootScope', '$state', '$timeout', 'uiMe', 'uiList', 'uiErrorBus',
function($scope, $rootScope, $state, $timeout, uiMe , uiList, uiErrorBus) {

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // When the application is initially rendered
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//



  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // DOM Events
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

  $scope.intent = angular.extend($scope.intent||{}, {

    recoverPassword: function(){
      uiMe.syncing.form = true;
      uiMe.forgot($scope.user.email)
      .then(function onSent(){

      })
      .finally(function eitherWay(){
        uiMe.syncing.form = false;
        $scope.status = "If " + $scope.user.email + " is a valid user, a password recovery email has been sent.";
        $scope.user.email = "";

        $scope.reminderDone = true;

        $timeout(function(){
          $scope.reminderDone = false;
        }, 5000);

      });

    }

  });

}]);
