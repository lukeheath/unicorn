module.exports = {


  friendlyName: 'If equal (===)',


  description: 'Determine whether the first value is equivalent to the second.',


  extendedDescription: 'Note that this machine performs a deep equality check by value.  That is, it doesn\'t care about memory addresses or things like that-- it\'s only interested in the actual semantic value of the data.  Basically, this is like what you would get if you stringified two JSON values and compared the resulting strings.',


  cacheable: true,


  sync: true,


  inputs: {

    a: {
      friendlyName: 'First value',
      description: 'The first value to check (expected to be equal to the second).',
      extendedDescription: 'A value of any type may be provided.',
      example: '===',
      required: true
    },

    b: {
      friendlyName: 'Second value',
      description: 'The second value to check (expected to be equal to the first).',
      extendedDescription: 'A value of any type may be provided.',
      example: '===',
      required: true
    }

  },


  exits: {

    error: {
      description: 'Unexpected error occurred.'
    },

    success: {
      friendlyName: 'then',
      description: 'The first value is equal to the second.'
    },

    otherwise: {
      friendlyName: 'else',
      description: 'The first value is NOT equal to the second.'
    }

  },


  defaultExit: 'success',


  fn: function(inputs, exits, env) {
    var _ = require('lodash');

    if (_.isEqual(inputs.a, inputs.b)) {
      return exits.success();
    }
    return exits.otherwise();
  }

};
