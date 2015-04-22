module.exports = {
  "inputs": {
    "username": {
      "example": "scott",
      "friendlyName": "username",
      "required": true
    },
    "email": {
      "example": "scott",
      "friendlyName": "email",
      "required": true
    },
    "password": {
      "example": "scott",
      "friendlyName": "password",
      "required": true
    },
    "gravatar": {
      "example": "scott",
      "friendlyName": "gravatar",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "username": "scott",
        "email": "scott",
        "password": "scott",
        "gravatar": "scott",
        "id": 123,
        "createdAt": "2015-04-22T03:32:07.425Z",
        "updatedAt": "2015-04-22T03:32:07.425Z"
      }
    },
    "error": {
      "example": undefined
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    env.sails.models.user.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_user"
};