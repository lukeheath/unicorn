module.exports = {


  friendlyName: 'Uppercase a string',


  description: 'Convert all lowercase letters to uppercase in the specified string.',


  extendedDescription: 'Returns a version of the string with uppercase characters replaced with lowercase characters -- this is equivalent to using `toUpperCase()` in JavaScript.',


  sync: true,


  cacheable: true,


  inputs: {
    string: {
      example: 'Some stuff and THINGS 235823523',
      description: 'The string to uppercase.',
      required: true
    }
  },


  exits: {
    success: {
      description: 'OK.',
      example: 'SOME STUFF AND THINGS 235823523',
    },
    error: {
      description: 'Unexpected error occurred.'
    }
  },


  defaultExit: 'success',


  fn: function (inputs, exits) {
    return exits.success(inputs.string.toUpperCase());
  }

};
