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
      "example": {
        "email": "bilbo@baggins.com",
        "userId": "123",
        "type": "facebook",
        "meta": "Stringified integration meta",
        "id": 123,
        "createdAt": "2015-05-09T20:43:03.536Z",
        "updatedAt": "2015-05-09T20:43:03.536Z"
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
    env.sails.models.integration.findOne(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, record) {
      if (err) {
        return exits.error(err);
      }
      if (!record) {
        return exits.notFound();
      }
      return exits.success(record);
    });
  },
  "identity": "findOne_integration"
};