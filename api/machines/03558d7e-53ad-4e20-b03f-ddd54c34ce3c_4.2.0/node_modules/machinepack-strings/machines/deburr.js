module.exports = {


  friendlyName: 'Deburr a string',


  description: 'Convert "latin-1 supplementary characters" to basic letters and remove combining diacritical marks.',


  extendedDescription: '',


  sync: true,


  cacheable: true,


  inputs: {

    string: {
      friendlyName: 'String',
      example: 'déjà vu',
      description: 'The string to clean up.',
      required: true
    }

  },


  exits: {

    success: {
      description: 'OK.',
      example: 'deja vu',
    }

  },


  fn: function (inputs, exits) {
    var _ = require('lodash');
    return exits.success(_.deburr(inputs.string));
  }

};
