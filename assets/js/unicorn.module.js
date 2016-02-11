/**
 * Module dependencies
 */

var dependencies = [
  'ui.router',
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
 * @module       unicorn
 * @type         {Function}
 * @description  An angular module for a web UI.
 */

angular.module('unicorn', dependencies)

// Config angular material design
.config(function($mdThemingProvider, $locationProvider) {

  $mdThemingProvider.theme('default')
  .primaryPalette('deep-purple')
  .accentPalette('pink')
  .warnPalette('red')
  .backgroundPalette('grey');

});