module.exports = {
  "inputs": {
    "email": {
      "example": "bilbo@baggins.com",
      "friendlyName": "email",
      "required": true
    },
    "userId": {
      "example": "123",
      "friendlyName": "userId",
      "required": true
    },
    "type": {
      "example": "facebook",
      "friendlyName": "type",
      "required": true
    },
    "meta": {
      "example": "Stringified integration meta",
      "friendlyName": "meta",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "email": "bilbo@baggins.com",
        "userId": "123",
        "type": "facebook",
        "meta": "Stringified integration meta",
        "id": 123,
        "createdAt": "2015-05-09T20:43:03.536Z",
        "updatedAt": "2015-05-09T20:43:03.536Z"
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