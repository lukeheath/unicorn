/**
 * Module dependencies
 */

var dependencies = [
	'ui.router',
	'ngTouch',
	'ngAnimate',
	'ngMaterial',
  'ngMdIcons',
  'cloudsdk',
  'lodash'
];

/**
 * Unicorn
 *
 * @class        {angular.module}
 * @module       Unicorn
 * @type         {Function}
 * @description  An angular module for a web UI.
 */

angular.module('unicorn', dependencies)

// Config angular material design
.config(function($mdThemingProvider, $locationProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('deep-purple')
    .accentPalette('pink')
    .warnPalette('red');
});