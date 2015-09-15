module.exports = {

  friendlyName: 'Get Facebook login URL',
  description: 'Get the URL on facebook.com that a user should visit to allow/deny the specified Facebook Developer app (i.e. your app).',
  extendedDescription: 'This is the URL where you typically redirect a user in order for them to grant access to your Facebook app.',
  cacheable: true,

  inputs: {
    appId: {
      example: '215798311808508',
      description: 'The unique identifier for your Facebook app  (i.e. this is the "App ID" listed on your app\'s dashboard page in the Facebook developer portal, e.g. https://developers.facebook.com/apps/215293311518502/dashboard)',
      required: true
    },
    callbackUrl: {
      example: 'http://localhost:1337/user/facebook/login',
      description: 'The callback URL where the end user will be redirected after visiting the login URL returned by this machine',
      required: true
    },
    permissions: {
      example: ['email'],
      description: 'The Facebook permissions requested by this application.  Most apps use `["user_friends", "email", and "public_profile"]`.  Other permissions may be requested, but require review from Facebook before the app can be used by others. For complete reference of all such permissions, see https://developers.facebook.com/docs/facebook-login/permissions/v2.2#reference'
    }
  },

  defaultExit: 'success',
  catchallExit: 'error',

  exits: {
    error: {
      description: 'Triggered when the Facebook API returns an error (i.e. a non-2xx status code)'
    },
    success: {
      example: 'https://www.facebook.com/dialog/oauth?client_id=215798311808508&redirect_uri=http://localhost:1337/user/facebook/login&scope=email,friends'
    }
  },

  fn: function (inputs, exits) {

    var util = require('util');

    inputs.permissions = inputs.permissions || ['email', 'public_profile', 'user_friends'];

    try {
      return exits.success(util.format(
        'https://www.facebook.com/dialog/oauth?client_id=%s&redirect_uri=%s&scope=%s',
        inputs.appId, inputs.callbackUrl, inputs.permissions.join(',')
      ));
    }
    catch(e) {
      return exits.error(e);
    }
  }
};
