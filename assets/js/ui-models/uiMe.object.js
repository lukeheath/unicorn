angular.module('unicorn').uiObject('uiMe', [

/**
 * Module Dependencies
 */

         'Cloud',
function( Cloud  ) {

  return {

    syncing: {
      app: true,
      form: false
    },
    integration: {},

    /**
     * Fetch new data from the server.
     *
     * @return {Promise}
     */
    fetch: function(){
      var self = this;

      return Cloud.getMyProfile()
      .then(function whenServerResponds(data) {
        self.replace(data);
      });
    },

    login: function(user){
      var self = this;

      return Cloud.login(user)
      .then(function whenServerRespond(data){
        self.replace(data);
      });
    },

    logout: function(user){
      var self = this;

      return Cloud.logout()
      .then(function whenServerRespond(data){
      self.replace({});
      });
    },

    signup: function(user){
      var self = this;

      return Cloud.signup(user)
      .then(function whenServerRespond(data){
        // Now that we have a user session
        // fetch the current user's data
        self.fetch();
      });
    },

    facebookAuth: function(){
      var self = this;

      return Cloud.facebookAuth()
      .then(function whenServerResponds(data){
        //console.log(data);
        window.location = data;
      })

    },

    integrateFacebook: function(token){
      var self = this;

      console.log("Integrate Facebook: " + token);

      return Cloud.integrateFacebook({code: token})
      .then(function onSuccess(data){
        if(data == 'login'){
          window.location = '/#/login';
        }
        else{
          window.location = '/#/signup?integrate=facebook';
        }
      })
      .catch(function onError(err){
        console.log("Error? ", err);
      })
    },

    getIntegration: function(){
      var self = this;

      return Cloud.getIntegration()
      .then(function onSuccess(data){
        self.integration = data;
      })
      .catch(function onError(err){
        console.log("Error? ", err);
      })
    }

  };
}]);

