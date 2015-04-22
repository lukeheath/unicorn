angular.module('cloudsdk').endpoints({

  // All endpoints are prefixed with the current host/port by default.
  // (e.g. "http://localhost:1337/")
  //
  // To set a different base url, set window.CONSTANTS.apiUrl
  // (e.g. `{apiUrl: 'https://whatever.foo.com:1500/api/v3'}`)
  // It will be applied to all of the endpoints below automatically.
  // (see assets/js/dependencies/cloudsdk.js for implementation)
  //
  // Each cloudsdk endpoint wrapper method takes an object of options you throw at it, then
  // determines the appropriate encoding based on the configuration of the matching
  // endpoint below.  i.e. if you have an endpoint method `updateFoo()` configured as `PUT /foo/:id`,
  // and you call it as `updateFoo({id: 7, email: 'rob@robertson.com'})`, the destination URL will be
  // automatically encoded with 7, the value you passed in for id (i.e. /foo/7) and the value you passed
  // in for `email` will be sent as an appropriately-encoded body parameter.
  //
  // Note that you can also configure cloud endpoint methods below using a function for lower-level control.
  // 99% of the time, this should not be necessary, and any custom code you might write in such a function
  // is probably better suited elsewhere in your UI code (likely a ui-model).  However, if you're still
  // interested, see implementation in assets/js/dependencies/cloudsdk.js for details.


  // Me (current user)
  login: 'PUT /me/login',
  logout: 'PUT /me/logout',
  signup: 'POST /me/signup',
  getMyProfile: 'GET /me',
  updateMyProfile: 'PUT /me',

  // Items
  listItems: 'GET /item',
  createItem: 'POST /item',
  updateItem: 'PUT /item/:id',
  destroyItem: 'DELETE /item/:id',

});
