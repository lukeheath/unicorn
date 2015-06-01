module.exports = {
  "inputs": {
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Test instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": [{
        "myString": "abc",
        "myNumber": 123,
        "id": 123,
        "createdAt": "2015-05-21T17:25:50.372Z",
        "updatedAt": "2015-05-21T17:25:50.372Z"
      }]
    },
    "error": {
      "example": undefined
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    env.sails.models.test.destroy(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "destroy_test"
};