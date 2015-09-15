module.exports = {


  friendlyName: 'Combine strings',


  description: 'Join an array of strings into one new string.',


  sync: true,


  cacheable: true,


  inputs: {

    strings: {
      description: 'The array of strings to join',
      example: ['foo'],
      required: true
    },

    separator: {
      description: 'The separator to insert between each string (by default, empty string)',
      defaultsTo: '',
      example: ','
    }

  },


  exits: {

    success: {
      description: 'Returns the concatenated result.',
      example: 'foo'
    }

  },


  fn: function(inputs, exits) {
    var result = inputs.strings.join(inputs.separator||'');
    return exits.success(result);
  },

};
