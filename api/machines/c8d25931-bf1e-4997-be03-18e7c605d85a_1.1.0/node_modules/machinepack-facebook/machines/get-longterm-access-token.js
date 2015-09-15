/**
 * WARNING:
 * This machine is in alpha and not currently exposed by this machinepack.
 */

// module.exports = {

//   friendlyName: 'Get longterm access token',
//   description: 'Swap a short term access token for a long term one.',
//   extendedDescription: 'Retrieve a new long-term access token, which allows you to get information and perform actions on behalf of a particular Facebook user. Long-term tokens usually have a lifetime of about 60 days.',
//   cacheable: false,

//   inputs: {
//     appId: {
//       example: '215798311808508',
//       description: 'The unique identifier for your Facebook app  (i.e. this is the "App ID" listed on your app\'s dashboard page in the Facebook developer portal, e.g. https://developers.facebook.com/apps/215293311518502/dashboard)',
//       required: true
//     },
//     appSecret: {
//       example: 'dsg4901g0123456',
//       description: 'Your Facebook app secret',
//       required: true
//     },
//     shortToken: {
//       example: 'g29hgasdg9a4u2h9en4Wejga$$2g00dhgj1olfndsga93103592t9hadignadva291',
//       description: 'The token obtained from the get-access-token machine.'
//     }
//   },

//   defaultExit: 'success',
//   catchallExit: 'error',

//   exits: {
//     error: {
//       description: 'The Facebook API returned an error (i.e. a non-2xx status code)'
//     },
//     success: {
//       description: 'The new long-term access token.',
//       example: 'aw9391th139sdvna$g00sdK!13gd'
//     }
//   },

//   fn: function (inputs, exits) {

//     var doJSONRequest = require('../lib/do-request');

//     // hit GET projects/ and send the api token as a header
//     doJSONRequest({
//       method: 'get',
//       url: '/oauth/access_token',
//       data: {
//         'grant_type': 'fb_exchange_token',
//         'client_id':inputs.appId,
//         'client_secret':inputs.appSecret,
//         'fb_exchange_token':inputs.shortToken,
//       },
//       headers: {},
//     }, function (err, responseBody) {
//       if (err) { return exits.error(err); }
//       return exits.success(responseBody);
//     });

//   }
// };
