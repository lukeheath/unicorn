module.exports = {
  "inputs": {
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
        "avatarUrl": "http://gravatar.com/bilbo",
        "username": "bilbo",
        "authToken": "abc123abc123abc123",
        "email": "bilbo@baggins.com",
        "password": "abc123",
        "id": 123,
        "createdAt": "2016-03-07T22:24:05.187Z",
        "updatedAt": "2016-03-07T22:24:05.187Z"
      }]
    },
    "error": {
      "example": undefined
    }
  },
  "sync": false,
  "cacheable": false,
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    env.sails.models.user.destroy(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "destroy_user"
};