/**
 * LoginCtrl
 *
 * @type {angular.controller}
 * @module  unicorn
 * @description  The UI controller for user login
 *
 *               ## Primary responsibilities:
 *               Logging in users
 *
 */

angular.module('unicorn')
.controller('LoginCtrl', [
        '$scope', '$rootScope', '$state', 'uiMe', 'uiList', 'uiErrorBus',
function($scope, $rootScope, $state, uiMe , uiList, uiErrorBus) {

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // When the application is initially rendered
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  //


  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // DOM Events
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

  $scope.intent = angular.extend($scope.intent||{}, {




  });

}]);
