module.exports = {


  friendlyName: 'Stringify as JSON',


  description: 'Encode the specified value into a JSON string.',


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

    couldNotStringify: {
      friendlyName: 'could not stringify',
      description: 'Could not stringify provided value into a JSON string.',
      extendedDescription: 'Oftentimes this error results from attempting to stringify a circular object (i.e. has a key or array item which points back to the parent object).  Refer to the official JSON specification at http://www.json.org/ for more information.'
    },

    success: {
      friendlyName: 'then',
      description: 'Done.',
      example: '...{"some stringified json": "like this"}...'
    }

  },


  fn: function(inputs, exits) {
    var jsonString;
    try {
      jsonString = JSON.stringify(inputs.value);
    }
    catch (e){
      return exits.couldNotStringify(e);
    }
    return exits.success(jsonString);
  }

};
