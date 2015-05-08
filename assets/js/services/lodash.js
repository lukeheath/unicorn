var lodash = angular.module('lodash', []);
lodash.factory('_', function() {
	return window._; // assumes lodash has already been loaded on the page
});  