module.exports = {


  friendlyName: 'Split using regexp',


  description: 'Split a string into an array of strings using a regular expression.',


  sync: true,


  cacheable: true,


  inputs: {

    string: {
      friendlyName: 'String',
      example: 'Hello world!',
      description: 'The string to split.',
      required: true
    },

    regexp: {
      friendlyName: 'Regular expression',
      example: '\\s',
      description: 'The regular expression for detecting delimiters which mark the end of each string segment.',
      extendedDescription: 'The regular expression should be specified as a string WIHOUUT including leading or trailing slashes or modifiers like /gi.',
      required: true
    },

    caseInsensitive: {
      friendlyName: 'Case insensitive?',
      description: 'Whether or not you care about uppercase/lowercase letters.',
      extendedDescription: 'This will build the regular expression using the `/i` modifier.',
      example: true,
      advanced: true,
      defaultsTo: true
    }

  },


  exits: {

    success: {
      friendlyName: 'then',
      description: 'Returns an array of substrings.',
      example: ['Hello']
    },

    invalidRegexp: {
      friendlyName: 'invalid regexp',
      description: 'Provided regular expression is invalid (cannot be instantiated into a RegExp object)'
    },

    error: {
      description: 'Unexpected error occurred.'
    }

  },


  defaultExit: 'success',


  fn: function (inputs, exits) {

    var _ = require('lodash');

    // Case-insensitive by default
    if (_.isUndefined(inputs.caseInsensitive)) {
      inputs.caseInsensitive = true;
    }

    // Check that the regexp is valid
    var regexp;
    try {

      regexp = inputs.regexp;

      /////////////////////////////////////////////////////////
      // Skip this-- we want users to be able to provide an actual
      // regexp with all the things (i.e. should be able to use the
      // star and dot and ? operators, etc)
      /////////////////////////////////////////////////////////
      // Then escape the provided string before instantiating
      // regexp = _.escapeRegExp(regexp);
      /////////////////////////////////////////////////////////

      // Then construct it
      // (and if relevant, enable case-insensitivity)
      if (inputs.caseInsensitive) {
        regexp = new RegExp(regexp, 'i');
      }
      else {
        regexp = new RegExp(regexp);
      }
    } catch (e) {
      return exits.invalidRegexp(e);
    }

    var substrings = inputs.string.split(regexp);

    return exits.success(substrings);

  }

};
