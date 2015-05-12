module.exports = {
  "inputs": {
    "avatarUrl": {
      "example": "http://gravatar.com/bilbo",
      "friendlyName": "avatarUrl",
      "required": true
    },
    "username": {
      "example": "bilbobaggins",
      "friendlyName": "username",
      "required": true
    },
    "authToken": {
      "example": "abc123abc123abc123",
      "friendlyName": "authToken",
      "required": true
    },
    "password": {
      "example": "abc123",
      "friendlyName": "password",
      "required": true
    },
    "email": {
      "example": "bilbo@baggins.com",
      "friendlyName": "email",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "avatarUrl": "http://gravatar.com/bilbo",
        "username": "bilbobaggins",
        "authToken": "abc123abc123abc123",
        "password": "abc123",
        "email": "bilbo@baggins.com",
        "id": 123,
        "createdAt": "2015-05-12T15:25:33.860Z",
        "updatedAt": "2015-05-12T15:25:33.860Z"
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