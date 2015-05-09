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
      "example": {
        "email": "bilbo@baggins.com",
        "password": "abc123",
        "avatarUrl": "http://gravatar.com/bilbo",
        "username": "bilbobaggins",
        "authToken": "abc123abc123abc123",
        "id": 123,
        "createdAt": "2015-05-09T02:13:15.232Z",
        "updatedAt": "2015-05-09T02:13:15.232Z"
      }
    },
    "error": {
      "example": undefined
    },
    "notFound": {
      "void": true
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    env.sails.models.user.findOne(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, record) {
      if (err) {
        return exits.error(err);
      }
      if (!record) {
        return exits.notFound();
      }
      return exits.success(record);
    });
  },
  "identity": "findOne_user"
};