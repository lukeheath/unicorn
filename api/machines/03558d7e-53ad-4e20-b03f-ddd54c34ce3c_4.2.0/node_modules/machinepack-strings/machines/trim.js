module.exports = {


  friendlyName: 'Trim whitespace',


  description: 'Trim trailing and leading whitespace from a string.',


  extendedDescription: '',


  inputs: {

    string: {
      friendlyName: 'String',
      example: '   I went to the store to get some more milk.     ',
      description: 'The string to trim.',
      required: true
    }

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      description: 'Done.',
      example: 'I went to the store to get some more milk.'
    },

  },


  fn: function (inputs,exits) {
    var _ = require('lodash');

    var trimmed = _.trim(inputs.string);
    return exits.success(trimmed);
  },



};
