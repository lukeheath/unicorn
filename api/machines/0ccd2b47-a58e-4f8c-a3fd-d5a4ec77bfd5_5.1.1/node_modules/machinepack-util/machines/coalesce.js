module.exports = {


  friendlyName: 'Coalesce values (?:)',


  description: 'Return the first value if it is defined, otherwise the second.',


  extendedDescription: 'The two values must have compatible types!  For example, "foo" is compatible with "bar", but it is not compatible with `{}`.  Also note that, in JavaScript, this is equivalent to `typeof a!=="undefined" ? a : b`, not `a||b`.  In other words, if the preferred value is false, zero, or the empty string, it will still be used.  The alternate value will only be used if the preferred value is **not defined**.',


  moreInfoUrl: 'http://en.wikipedia.org/wiki/Null_coalescing_operator',


  cacheable: true,


  sync: true,


  inputs: {

    a: {
      friendlyName: 'Preferred value',
      description: 'The preferred value to use, if it\'s defined. Must be the same type as the alternate.',
      example: '==='
    },

    b: {
      friendlyName: 'Alternate value',
      description: 'The backup/alternate value to use in case the preferred value is not defined.',
      example: '===',
      required: true
    }

  },


  exits: {

    success: {
      variableName: 'result',
      description: 'Done.',
      getExample: function (inputs){
        return inputs.b;
      }
    },

  },


  fn: function (inputs,exits) {
    return exits.success(typeof inputs.a !== 'undefined' ? inputs.a : inputs.b);
  },



};
