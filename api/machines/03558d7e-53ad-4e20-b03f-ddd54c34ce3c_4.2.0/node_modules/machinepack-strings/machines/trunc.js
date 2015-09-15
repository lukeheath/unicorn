module.exports = {


  friendlyName: 'Truncate string',


  description: 'If the string is longer than the given maximum length, chop off characters from the end.',


  extendedDescription: 'By default, this machine will reduce the string to a maximum of 30 characters, including a 3-character elipses ("...") added to the end.  An additional default behavior of this machine (which can be disabled by disabling the `pretty` option) is to omit trailing spaces and punctuation, and also avoid chopping words in half.',


  inputs: {

    string: {
      friendlyName: 'String',
      example: 'Christian van der Henst',
      description: 'The string to truncate.',
      required: true
    },

    maxLength: {
      friendlyName: 'Max length',
      description: 'The maximum number of characters (including the "...")',
      example: 15,
      defaultsTo: 30
    },

    omission: {
      friendlyName: 'Omission substring',
      description: 'The substring to append to our string indicating characters were omitted.',
      example: '...',
      defaultsTo: '...'
    },

    pretty: {
      friendlyName: 'Make pretty?',
      description: 'Whether or not to attempt to make the truncated string look more natural.',
      extendedDescription: 'This truncates trailing spaces and punctuation, and also avoids chopping words in half.',
      example: true,
      defaultsTo: true
    }

  },


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      description: 'Done.',
      example: 'Christian van...'
    },

  },


  fn: function (inputs,exits) {
    var _ = require('lodash');

    var opts = {
      length: inputs.maxLength,
      omission: inputs.omission
    };
    if (inputs.pretty){
      opts.separator = /[^0-9a-z]?\s+/i;
    }

    var truncated = _.trunc(inputs.string, opts);
    return exits.success(truncated);
  },



};
