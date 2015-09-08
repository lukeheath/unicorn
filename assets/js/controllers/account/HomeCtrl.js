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
        '$scope', '$rootScope', '$state', '$interval', 'uiMe', 'uiList', 'uiErrorBus',
function($scope, $rootScope, $state, $interval, uiMe , uiList, uiErrorBus) {

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // When the application is initially rendered
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

  var iconList = [
  	'face',
  	'explore',
  	'favorite_outline',
  	'language',
  	'room',
  	'visibility',
  	'loop',
  	'phone',
  	'airplanemode_on',
  	'insert_emoticon',
  	'cloud_queue',
  	'blur_on',
  	'brush',
  	'menu',
  	'group',
  	'star'
  ];

  var listLength = iconList.length;

  var setRandomIcon = function(){
  	$scope.currentIcon = iconList[Math.floor(Math.random()*listLength)];
  };

  setRandomIcon();

  $interval(function(){
  	setRandomIcon();
  }, 3000)

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // DOM Events
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

  $scope.intent = angular.extend($scope.intent||{}, {

    

  });

}]);
