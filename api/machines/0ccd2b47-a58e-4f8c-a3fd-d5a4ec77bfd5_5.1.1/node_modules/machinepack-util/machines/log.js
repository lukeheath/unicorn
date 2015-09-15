module.exports = {


  friendlyName: 'Log a message',


  description: 'Output a message to the console',


  sync: true,


  extendedDescription: '',


  inputs: {

    value: {
      friendlyName: 'Value',
      description: 'The value that will be written to the console.',
      example: '==='
    }

  },


  exits: {

    success: {
      description: 'Done.'
    }

  },


  fn: function(inputs, exits) {
    console.log(inputs.value);
    return exits.success();
  }

};
