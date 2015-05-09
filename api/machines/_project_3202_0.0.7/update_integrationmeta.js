module.exports = {
  "inputs": {
    "integrationId": {
      "example": "123",
      "friendlyName": "integrationId"
    },
    "integrationMeta": {
      "example": "Stringified JSON",
      "friendlyName": "integrationMeta"
    },
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Integrationmeta instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": [{
        "integrationId": "123",
        "integrationMeta": "Stringified JSON",
        "id": 123,
        "createdAt": "2015-05-09T12:15:47.155Z",
        "updatedAt": "2015-05-09T12:15:47.155Z"
      }]
    },
    "error": {
      "example": undefined
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    env.sails.models.integrationmeta.update(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, records) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(records);
    });
  },
  "identity": "update_integrationmeta"
};