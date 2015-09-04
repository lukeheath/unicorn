module.exports = {
  "inputs": {
    "criteria": {
      "friendlyName": "criteria",
      "typeclass": "dictionary",
      "description": "Waterline search criteria to use in retrieving Test instances"
    }
  },
  "exits": {
    "success": {
      "friendlyName": "then",
      "example": {
        "myString": "abc",
        "myNumber": 123,
        "id": 123,
        "createdAt": "2015-05-21T17:25:50.372Z",
        "updatedAt": "2015-05-21T17:25:50.372Z"
      }
    },
    "error": {
      "example": undefined
    },
    "notFound": {
      "void": true
    }
  },
  "sync": false,
  "cacheable": false,
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    env.sails.models.test.findOne(inputs.criteria, env.sails.util.omit(env.sails.util.objCompact(inputs), 'criteria')).exec(function(err, record) {
      if (err) {
        return exits.error(err);
      }
      if (!record) {
        return exits.notFound();
      }
      return exits.success(record);
    });
  },
  "identity": "findOne_test"
};