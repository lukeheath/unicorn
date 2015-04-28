module.exports = {
  "inputs": {
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
    },
    "username": {
      "example": "scott",
      "friendlyName": "username",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "email": "scott",
        "password": "scott",
        "gravatar": "scott",
        "username": "scott",
        "id": 123,
        "createdAt": "2015-04-28T15:38:53.873Z",
        "updatedAt": "2015-04-28T15:38:53.873Z"
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