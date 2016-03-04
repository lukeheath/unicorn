/**
 * uiDirector
 *
 * @type {angular.factory}
 * @module  unicorn
 * @description  A factory to handle interfactory communication
 *
 *               ## Primary responsibilities:
 *               - Facilitates interfactory communication by including all factories
 *               but not being included by any others
 *
 */

angular.module('unicorn').uiObject('uiDirector', [

/**
 * Module Dependencies
 */

         'Cloud',
         'uiErrorBus',
         '$q',
function( Cloud, uiErrorBus, $q ) {

  return {

    // Create deferred promise for app ready state
    appReady: $q.defer(),

    /**
     * Fetch new data from the server.
     *
     * @return {Promise}
     */
    init: function(){
      
      self.appReady.resolve();

    }

  };
}]);

