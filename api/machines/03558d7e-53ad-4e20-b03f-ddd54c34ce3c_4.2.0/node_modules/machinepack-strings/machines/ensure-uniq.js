module.exports = {


  friendlyName: 'Ensure uniqueness',


  description: 'Make a unique, but still human-readable, version of a string vs. a set of existing strings by adding a number to the end.',


  cacheable: true,


  sync: true,


  inputs: {

    string: {
      friendlyName: 'Unique string',
      example: 'Siri',
      description: 'The string to ensure the uniqueness of.',
      required: true
    },

    existingStrings: {
      friendlyName: 'Existing strings',
      description: 'The set of existing strings to check uniqueness against.',
      example: ['Siri'],
      required: true
    },

    caseSensitive: {
      friendlyName: 'Case sensitive?',
      description: 'Whether or not the uniqueness check should be case-sensitive (care about uppercase vs. lowercase letters)',
      example: false,
      defaultsTo: false
    }

  },


  exits: {

    success: {
      variableName: 'uniqueStr',
      example: 'Siri2',
      description: 'Done.',
    },

  },


  fn: function (inputs,exits) {

    var _ = require('lodash');

    var potentiallyUniqueStr = inputs.string;

    // The string is not unique until none of the other strings in the set have the same name.
    while (_.any(inputs.existingStrings, function doesItMatch(existingStr) {
      // Either case-sensitive or not.
      if (inputs.caseSensitive) {
        return existingStr === potentiallyUniqueStr;
      }
      return existingStr.toLowerCase() === potentiallyUniqueStr.toLowerCase();
    }) ){

      // If the last part of the string is one or more numerals, we'll take a pass at incrementing
      // that existing number rather than just chaining more numbers onto the end.
      if (potentiallyUniqueStr.match(/[0-9]+$/g)) {
        potentiallyUniqueStr = potentiallyUniqueStr.replace(/[0-9]+$/, function(substr, index) {
          return ''+((+substr) + 1);
        });
      }
      // If not, just add a big fat "2" onto the end.
      else {
        potentiallyUniqueStr += '2';
      }
    }

    return exits.success(potentiallyUniqueStr);
  },



};
