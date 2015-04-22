angular.module('unicorn').uiObject('uiMe', [

/**
 * Module Dependencies
 */

         'Cloud',
function( Cloud  ) {

  return {

    /**
     * Fetch new data from the server.
     *
     * @return {Promise}
     */
    fetch: function (){
      var self = this;

      return Cloud.getMyProfile()
      .then(function whenServerResponds(data) {
        console.log(data);
        self.replace(data);
      });

    }
  };
}]);

