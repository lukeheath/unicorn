module.exports = {


  friendlyName: 'Search string using regexp',


  description: 'Search a string using a regular expression and return the first match.',


  sync: true,


  cacheable: true,


  inputs: {

    string: {
      friendlyName: 'String to search',
      example: 'hello world',
      description: 'The string to search (i.e. "haystack")',
      required: true
    },

    regexp: {
      friendlyName: 'Regular expression',
      example: 'world',
      description: 'The regular expression to match against (i.e. "metal detector")',
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
      friendlyName: 'match found',
      description: 'Returns the matched substring.',
      example: {
        found: 'world',
        at: 6
      }
    },

    invalidRegexp: {
      friendlyName: 'invalid regexp',
      description: 'Provided regular expression is invalid (cannot be instantiated into a RegExp object)'
    },

    notFound: {
      friendlyName: 'no match found',
      description: 'No match found.'
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

    var matches = inputs.string.match(regexp);
    if (!matches) {
      return exits.notFound();
    }

    return exits.success({
      found: matches[0],
      at: matches.index
    });

  }

};
