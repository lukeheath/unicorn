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
        "type": "facebook",
        "email": "bilbo@baggins.com",
        "meta": "Stringified integration meta",
        "userId": 123,
        "id": 123,
        "createdAt": "2015-05-12T15:27:38.682Z",
        "updatedAt": "2015-05-12T15:27:38.682Z"
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