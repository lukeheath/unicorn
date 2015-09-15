module.exports = {


  friendlyName: 'If less than (<)',


  description: 'Determine whether the first value is less than the second.',


  cacheable: true,


  sync: true,


  inputs: {

    a: {
      friendlyName: 'Lesser value',
      description: 'The first value to check (expected to be less than the second).',
      extendedDescription: 'A value of any type may be provided.',
      example: '===',
      required: true
    },

    b: {
      friendlyName: 'Other value',
      description: 'The second value to check (expected to be greater than the first).',
      extendedDescription: 'A value of any type may be provided.',
      example: '===',
      required: true
    },

    isInclusive: {
      friendlyName: 'Inclusive? (<=)',
      description: 'Whether to trigger the "then" exit if both values are equal.',
      defaultsTo: false,
      example: true,
      extendedDescription: 'If set, this machine will use the <= operator for comparison.'
    }

  },


  exits: {

    error: {
      description: 'Unexpected error occurred.'
    },

    success: {
      friendlyName: 'then',
      description: 'The first value is less than the second.'
    },

    otherwise: {
      friendlyName: 'else',
      description: 'The first value is NOT less than the second.'
    }

  },


  'fn': function(inputs, exits, env) {
    if (inputs.isInclusive){
      if (inputs.a <= inputs.b) {
        return exits.success();
      }
      return exits.otherwise();
    }
    if (inputs.a < inputs.b) {
      return exits.success();
    }
    return exits.otherwise();
  }

};
