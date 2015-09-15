module.exports = {


  friendlyName: 'Pretty-print',


  description: 'Format any value into a more-readable string.',


  sync: true,


  cacheable: true,


  inputs: {

    value: {
      friendlyName: 'Value',
      example: '===',
      description: 'The value that will be formatted into a more-readable string.'
    }

  },


  exits: {

    success: {
      description: 'Done.',
      variableName: 'prettified',
      example: '...[{\'foo\': [\'bar\']}]...'
    }

  },


  fn: function(inputs, exits) {
    var util = require('util');
    var _ = require('lodash');

    if (_.isError(inputs.value)) {
      return exits.success(util.inspect(inputs.value.stack));
    }
    if (_.isObject(inputs.value)) {
      return exits.success(util.inspect(inputs.value, false, null));
    }
    return exits.success(util.inspect(inputs.value));
  }

};
