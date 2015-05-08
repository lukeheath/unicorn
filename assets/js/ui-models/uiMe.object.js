angular.module('unicorn').uiObject('uiMe', [

/**
 * Module Dependencies
 */

         'Cloud',
         'uiErrorBus',
function( Cloud, uiErrorBus ) {

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

    forgot: function(email){
      var self = this;

      console.log('email: ' + email);

      return Cloud.forgot({email: email})
      .then(function whenServerRespond(data){
        // Now that we have a user session
        // fetch the current user's data
        self.fetch();
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
        self.fetch();
      });
    },

    resetPassword: function(newPassword, authToken){
      var self = this;

      return Cloud.resetPassword({password: newPassword, token: authToken})
      .then(function whenServerResponds(data){
        
      })
      .catch(function onError(err){
        uiErrorBus.$handleError(err.data);
      })
    },

    facebookAuth: function(){
      var self = this;

      return Cloud.facebookAuth()
      .then(function whenServerResponds(data){
        //console.log(data);
        window.location = data;
      });
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
    },

    updateProfile: function(user){
      var self = this;

      return Cloud.updateMyProfile(user)
      .then(function onSucccess(data){
        self.fetch();
      })
      .catch(function onError(err){
        uiErrorBus.$handleError(err.data);
      });
    },

    authenticate: function(token){
      var self = this;

      return Cloud.authenticate({token: token})
      .then(function onSuccess(){
        self.fetch();
      })
      .catch(function onError(err){
        console.log("Auth error: " + err);
        uiErrorBus.$handleError(err.data);
      })
    }

  };
}]);

