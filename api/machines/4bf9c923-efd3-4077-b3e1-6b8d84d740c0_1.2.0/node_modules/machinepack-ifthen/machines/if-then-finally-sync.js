module.exports = {


  friendlyName: 'If..Then..Finally (sync)',


  description: 'If the provided value is true, then run the "then" circuit.  Otherwise run the "else" circuit.  Either way, exit "success".',


  sync: true,


  inputs: {

    bool: {
      description: 'The true/false value to check.',
      example: true
    },

    then: {
      example: '->',
      contract: {
        sync: true,
        inputs: {},
        exits: {
          success: {
            like: 'expectedOutput'
          }
        }
      },
      required: true,
    },

    orElse: {
      example: '->',
      contract: {
        sync: true,
        inputs: {},
        exits: {
          success: {
            like: 'expectedOutput'
          }
        }
      },
      defaultsTo: function (_inputs, _exits){
        return _exits.success();
      }
    },

    expectedOutput: {
      description: 'An example of the expected output value.',
      example: '*'
    }

  },


  exits: {

    success: {
      variableName: 'result',
      // like: 'expectedOutput',
      getExample: function (inputs, env){
        var _ = env._;
        if (_.isUndefined(inputs.expectedOutput)) {
          return;
        }
        return inputs.expectedOutput;
      },
      description: 'Done.',
    },

  },


  fn: function (inputs,exits) {

    var result;

    if (inputs.bool) {
      result = inputs.then().execSync();
    }
    else {
      result = inputs.orElse().execSync();
    }

    return exits.success(result);
  },



};
