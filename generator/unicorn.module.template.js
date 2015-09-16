/**
 * Module dependencies
 */

var dependencies = [
  'ui.router',
  'ngTouch',
  'ngAnimate',
  'ngMaterial',
  'cloudsdk',
  'lodash'
];

/**
 * <%=unicorn.name%>
 *
 * @class        {angular.module}
 * @module       <%=unicorn.name%>
 * @type         {Function}
 * @description  An angular module for a web UI.
 */

angular.module('<%=unicorn.module%>', dependencies)

// Config angular material design
.config(function($mdThemingProvider, $locationProvider) {

  var s

  $mdThemingProvider.theme('default')
    .primaryPalette('deep-purple')
    .accentPalette('pink')
    .warnPalette('red')
    .backgroundPalette('grey');
});