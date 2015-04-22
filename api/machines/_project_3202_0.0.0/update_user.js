module.exports = {
  "inputs": {
    "username": {
      "example": "scott",
      "friendlyName": "username"
    },
    "email": {
      "example": "scott",
      "friendlyName": "email"
    },
    "password": {
      "example": "scott",
      "friendlyName": "password"
    },
    "gravatar": {
      "example": "scott",
      "friendlyName": "gravatar"
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
        "username": "scott",
        "email": "scott",
        "password": "scott",
        "gravatar": "scott",
        "id": 123,
        "createdAt": "2015-04-22T03:32:07.425Z",
        "updatedAt": "2015-04-22T03:32:07.425Z"
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