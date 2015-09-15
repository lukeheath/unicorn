module.exports = {


  friendlyName: 'Convert string to camel-case',


  description: 'Build a new camel-cased version of the specified string.',


  extendedDescription: 'Returns a version of the string with dashes removed, using medial capitalization to separate words instead. See http://en.wikipedia.org/wiki/CamelCase for more information.',


  sync: true,


  cacheable: true,


  inputs: {
    string: {
      friendlyName: 'String',
      example: 'foo-bar-baz',
      description: 'The string to convert (dash-delimited or otherwise)',
      required: true
    }
  },


  exits: {
    success: {
      description: 'OK.',
      example: 'fooBarBaz',
    },
    error: {
      description: 'Unexpected error occurred.'
    }
  },


  defaultExit: 'success',


  fn: function (inputs, exits) {

    var _ = require('lodash');
    return exits.success(_.camelCase(inputs.string));

    // var parts = inputs.string.split(/[\W_]/);
    // var transformedParts = [];
    // parts.forEach(function(part, index) {
    //   part = part.toLowerCase();
    //   if (index !== 0) {
    //     part = part[0].toUpperCase()+part.substr(1);
    //   }
    //   transformedParts.push(part);
    // });
    // return exits.success(transformedParts.join(''));

  }

};
