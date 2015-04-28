module.exports = {
  "inputs": {
    "firstName": {
      "example": "scott",
      "friendlyName": "firstName",
      "required": true
    },
    "lastName": {
      "example": "scott",
      "friendlyName": "lastName",
      "required": true
    },
    "email": {
      "example": "scott",
      "friendlyName": "email",
      "required": true
    },
    "type": {
      "example": "scott",
      "friendlyName": "type",
      "required": true
    },
    "userId": {
      "example": 123,
      "friendlyName": "userId",
      "required": true
    },
    "gender": {
      "example": "scott",
      "friendlyName": "gender",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "firstName": "scott",
        "lastName": "scott",
        "email": "scott",
        "type": "scott",
        "userId": 123,
        "gender": "scott",
        "id": 123,
        "createdAt": "2015-04-28T15:39:34.352Z",
        "updatedAt": "2015-04-28T15:39:34.352Z"
      }
    },
    "error": {
      "example": undefined
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    env.sails.models.integration.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_integration"
};