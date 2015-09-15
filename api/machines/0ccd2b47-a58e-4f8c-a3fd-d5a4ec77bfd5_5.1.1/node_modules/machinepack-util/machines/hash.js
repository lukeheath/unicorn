module.exports = {


  friendlyName: 'Hash',


  description: 'Generate unique string from the provided value.',


  sync: true,


  cacheable: true,


  extendedDescription: 'Useful for checksums (error-checking) and hash keys (caching, etc.) Uses the crypto module from Node core via `object-hash` on NPM (see http://npmjs.org/package/object-hash)',


  inputs: {

    value: {
      friendlyName: 'Value',
      example: '*',
      description: 'The value for which to calculate a unique hash string.',
      required: true
    }

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.'
    },

    success: {
      description: 'Done.',
      example: 'e003c89cdf35cdf46d8239b4692436364b7259f9'
    }

  },


  fn: function(inputs, exits) {

    var hashFn = require('object-hash');
    var hash = hashFn(inputs.value);
    return exits.success(hash);

  },

};
