module.exports = {
  "inputs": {
    "email": {
      "example": "bilbo@baggins.com",
      "friendlyName": "email"
    },
    "userId": {
      "example": "123",
      "friendlyName": "userId"
    },
    "type": {
      "example": "facebook",
      "friendlyName": "type"
    },
    "meta": {
      "example": "Stringified integration meta",
      "friendlyName": "meta"
    },
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Integration instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": [{
        "email": "bilbo@baggins.com",
        "userId": "123",
        "type": "facebook",
        "meta": "Stringified integration meta",
        "id": 123,
        "createdAt": "2015-05-09T20:43:03.536Z",
        "updatedAt": "2015-05-09T20:43:03.536Z"
      }]
    },
    "error": {
      "example": undefined
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    env.sails.models.integration.update(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "update_integration"
};