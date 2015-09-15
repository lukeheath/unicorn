module.exports = {


  friendlyName: 'Length',


  description: 'Determine the length of a string (i.e. count the number of characters)',


  extendedDescription: '',


  sync: true,


  cacheable: true,


  inputs: {

    string: {
      example: 'guido villeriño',
      description: 'The string whose characters will be counted.',
      required: true
    }

  },


  exits: {
    success: {
      friendlyName: 'then',
      description: 'OK.',
      example: 15,
    },
    error: {
      description: 'Unexpected error occurred.'
    }
  },


  defaultExit: 'success',


  fn: function (inputs, exits) {
    return exits.success(inputs.string.length);
  }

};
