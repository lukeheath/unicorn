module.exports = {
  "inputs": {
    "myString": {
      "example": "abc",
      "friendlyName": "myString",
      "required": true
    },
    "myNumber": {
      "example": 123,
      "friendlyName": "myNumber",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "myString": "abc",
        "myNumber": 123,
        "id": 123,
        "createdAt": "2015-05-21T17:25:50.372Z",
        "updatedAt": "2015-05-21T17:25:50.372Z"
      }
    },
    "error": {
      "example": undefined
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    env.sails.models.test.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_test"
};