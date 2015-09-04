module.exports = {
  "inputs": {
    "type": {
      "example": "facebook",
      "friendlyName": "type",
      "required": true
    },
    "email": {
      "example": "bilbo@baggins.com",
      "friendlyName": "email",
      "required": true
    },
    "meta": {
      "example": "Stringified integration meta",
      "friendlyName": "meta",
      "required": true
    },
    "userId": {
      "example": 123,
      "friendlyName": "userId",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "type": "facebook",
        "email": "bilbo@baggins.com",
        "meta": "Stringified integration meta",
        "userId": 123,
        "id": 123,
        "createdAt": "2015-05-12T15:27:38.682Z",
        "updatedAt": "2015-05-12T15:27:38.682Z"
      }
    },
    "error": {
      "example": undefined
    }
  },
  "sync": false,
  "cacheable": false,
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