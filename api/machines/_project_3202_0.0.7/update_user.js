module.exports = {
  "inputs": {
    "email": {
      "example": "bilbo@baggins.com",
      "friendlyName": "email"
    },
    "password": {
      "example": "abc123",
      "friendlyName": "password"
    },
    "avatarUrl": {
      "example": "http://gravatar.com/bilbo",
      "friendlyName": "avatarUrl"
    },
    "username": {
      "example": "bilbobaggins",
      "friendlyName": "username"
    },
    "authToken": {
      "example": "abc123abc123abc123",
      "friendlyName": "authToken"
    },
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving User instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": [{
        "email": "bilbo@baggins.com",
        "password": "abc123",
        "avatarUrl": "http://gravatar.com/bilbo",
        "username": "bilbobaggins",
        "authToken": "abc123abc123abc123",
        "id": 123,
        "createdAt": "2015-05-09T02:13:15.232Z",
        "updatedAt": "2015-05-09T02:13:15.232Z"
      }]
    },
    "error": {
      "example": undefined
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    env.sails.models.user.update(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "update_user"
};