/**
 * SignupCtrl
 *
 * @type {angular.controller}
 * @module  unicorn
 * @description  The UI controller for user signup
 *
 *               ## Primary responsibilities:
 *               Signing users up
 *
 */

angular.module('unicorn')
.controller('SignupCtrl', [
        '$scope', '$rootScope', '$state', '$location', 'uiMe', 'uiList', 'uiErrorBus',
function($scope, $rootScope, $state, $location, uiMe , uiList, uiErrorBus) {

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // When the application is initially rendered
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  
  // If this is an integration signup, 
  // get the integration record
  if($location.search().integrate){
    uiMe.getIntegration()
    .then(function onSuccess(){
      $scope.user = {
        email: uiMe.integration.email,
        integrationId: uiMe.integration.id
      };
    });
  }


  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // DOM Events
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

  $scope.intent = angular.extend($scope.intent||{}, {

    signup: function(){
      uiMe.syncing.form = true;
      uiMe.signup($scope.user)
      .then(function onLogin(){
        $state.go('profile');
      })
      .catch(function onError(err){
        uiErrorBus.$handleError(err);
      })
      .finally(function eitherWay(){
        uiMe.syncing.form = false;
      });
    }

  });

}]);
