module.exports = {
  friendlyName: 'Convert to string',
  description: 'Convert a specified value to a string, if it isn\'t one already.',
  extendedDescription: 'For example, 5 is converted to "5".',
  sync: true,
  cacheable: true,
  inputs: {
    value: {
      description: 'The value to convert',
      example: '===',
      required: true
    }
  },
  defaultExit: 'success',
  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Done.',
      example: 'some string'
    }
  },
  fn: function(inputs, exits) {
    return exits.success(inputs.value+'');
  },

};
