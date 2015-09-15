module.exports = {


  friendlyName: 'Stringify (safe)',


  description: 'Encode the specified value into a JSON string, but tolerate recursive objects and preserve functions, errors, and regexps.',


  sync: true,


  cacheable: true,


  inputs: {

    value: {
      friendlyName: 'Data',
      description: 'The data to encode as a JSON string',
      example: '*',
      required: true
    }

  },


  exits: {

    success: {
      friendlyName: 'then',
      description: 'Done.',
      example: '...{"some stringified json": "like this"}...'
    }

  },


  fn: function (inputs,exits) {

    var _ = require('lodash');

    /**
     * This was modified by @mikermcneil from @isaacs' json-stringify-safe
     * (see https://github.com/isaacs/json-stringify-safe/commit/02cfafd45f06d076ac4bf0dd28be6738a07a72f9#diff-c3fcfbed30e93682746088e2ce1a4a24)
     * @param  {*} val           [description]
     * @return {String}               [description]
     */
    function serializer(replacer, cycleReplacer) {
      var stack = [];
      var keys = [];

      if (!cycleReplacer) {
        cycleReplacer = function(key, value) {
          if (stack[0] === value) return '[Circular ~]';
          return '[Circular ~.' + keys.slice(0, stack.indexOf(value)).join('.') + ']';
        };
      }

      return function(key, value) {
        if (stack.length > 0) {
          var thisPos = stack.indexOf(this);
          ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
          ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
          if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value);
        }
        else stack.push(value);

        // Do some advanced serialization
        if (_.isError(value)){
          value = value.stack;
        }
        else if (_.isRegExp(value)){
          value = value.toString();
        }
        else if (_.isFunction(value)){
          value = value.toString();
        }

        if (!replacer) {
          return value;
        }
        return replacer.call(this, key, value);
      };
    }

    var jsonString = JSON.stringify(inputs.value, serializer());
    return exits.success(jsonString);

  },



};
