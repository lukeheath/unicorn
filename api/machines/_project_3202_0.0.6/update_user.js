module.exports = {
  "inputs": {
    "password": {
      "example": "abc123",
      "friendlyName": "password"
    },
    "email": {
      "example": "bilbo@baggins.com",
      "friendlyName": "email"
    },
    "gravatar": {
      "example": "http://gravatar.com/bilbo",
      "friendlyName": "gravatar"
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
        "password": "abc123",
        "email": "bilbo@baggins.com",
        "gravatar": "http://gravatar.com/bilbo",
        "username": "bilbobaggins",
        "authToken": "abc123abc123abc123",
        "id": 123,
        "createdAt": "2015-05-07T17:20:45.723Z",
        "updatedAt": "2015-05-07T17:20:45.723Z"
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