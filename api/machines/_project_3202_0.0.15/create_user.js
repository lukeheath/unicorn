module.exports = {
  "inputs": {
    "avatarUrl": {
      "example": "http://gravatar.com/bilbo",
      "friendlyName": "avatarUrl",
      "required": true
    },
    "username": {
      "example": "bilbo",
      "friendlyName": "username",
      "required": true
    },
    "authToken": {
      "example": "abc123abc123abc123",
      "friendlyName": "authToken",
      "required": true
    },
    "email": {
      "example": "bilbo@baggins.com",
      "friendlyName": "email",
      "required": true
    },
    "password": {
      "example": "abc123",
      "friendlyName": "password",
      "required": true
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "avatarUrl": "http://gravatar.com/bilbo",
        "username": "bilbo",
        "authToken": "abc123abc123abc123",
        "email": "bilbo@baggins.com",
        "password": "abc123",
        "id": 123,
        "createdAt": "2016-03-07T22:24:05.187Z",
        "updatedAt": "2016-03-07T22:24:05.187Z"
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
    env.sails.models.user.create(env.sails.util.objCompact(inputs)).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "create_user"
};