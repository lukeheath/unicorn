/**
 * IntegrationCtrl
 *
 * @type {angular.controller}
 * @module  unicorn
 * @description  Handles social media integration login / signup
 *
 *               ## Primary responsibilities:
 *               Log users in via integrated social accounts
                 If no user account is found, redirect to signup
 *
 */

angular.module('unicorn')
.controller('IntegrationCtrl', [ '$scope', '$state', '$location', 'uiMe', 
function($scope, $state, $location, uiMe) {

	function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

  var token = getParameterByName('code');

  if(!token){
    window.location = '/';
  }

  uiMe.integrateFacebook(token);
  

}]);
