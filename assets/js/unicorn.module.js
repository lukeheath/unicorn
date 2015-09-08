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

  // Extend the chosen theme with custom colors
  // We need white to be available as an accent palette option
  var customPaletteMap = $mdThemingProvider.extendPalette('pink', {
    'A700': 'ffffff'
  });

  // Register the new color palette map
  $mdThemingProvider.definePalette('custom-pink', customPaletteMap);

  $mdThemingProvider.theme('default')
    .primaryPalette('deep-purple')
    .accentPalette('custom-pink', {
      'hue-3': 'A700'
    })
    .warnPalette('red');
});