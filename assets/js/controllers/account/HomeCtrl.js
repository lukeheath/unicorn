/**
 * HomeCtrl
 *
 * @type {angular.controller}
 * @module  unicorn
 * @description  The UI controller for the homepage
 *
 *               ## Primary responsibilities:
 *               Homepage data handling
 *
 */

angular.module('unicorn')
.controller('HomeCtrl', [
        '$scope', '$rootScope', '$state', '$timeout', 'uiMe', 'uiList', 'uiErrorBus',
function($scope, $rootScope, $state, $timeout, uiMe , uiList, uiErrorBus) {

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // When the application is initially rendered
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

  

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // DOM Events
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

  $scope.intent = angular.extend($scope.intent||{}, {

    

  });

}]);
