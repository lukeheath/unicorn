module.exports = {
  "inputs": {
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
        "firstName": "scott",
        "lastName": "scott",
        "email": "scott",
        "type": "scott",
        "userId": 123,
        "gender": "scott",
        "id": 123,
        "createdAt": "2015-04-28T15:39:34.352Z",
        "updatedAt": "2015-04-28T15:39:34.352Z"
      }]
    },
    "error": {
      "example": undefined
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    env.sails.models.integration.destroy(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "destroy_integration"
};