module.exports = {


  friendlyName: 'If defined',


  description: 'Determine whether the value is defined.',


  cacheable: true,


  sync: true,


  inputs: {

    value: {
      friendlyName: 'Value',
      description: 'The value to check.',
      extendedDescription: 'A value of any type may be provided.  If it evaluates to \'undefined\', the \'otherwise\' exit will be triggered.  Otherwise the \'then\' exit will be triggered.',
      example: '==='
    }

  },


  exits: {

    error: {
      description: 'Unexpected error occurred.'
    },

    success: {
      friendlyName: 'then',
      description: 'The value is defined.',
      getExample: function(inputs, env) {
        var _ = env._;

        // If `value` is not available, it means that we should leave it `undefined`.
        if (_.isUndefined(inputs.value)) {
          return;
        }
        return inputs.value;
      }
    },

    otherwise: {
      friendlyName: 'else',
      description: 'The value is not defined.'
    }

  },


  fn: function(inputs, exits, env) {
    if (typeof(inputs.value) === 'undefined') {
      return exits.otherwise();
    }
    return exits.success(inputs.value);
  }

};
