module.exports = {
  "inputs": {
    "id": {
      "friendlyName": "id",
      "description": "ID of model to modify",
      "example": "",
      "required": true,
      "addedManually": true
    },
    "attrs": {
      "friendlyName": "attrs",
      "description": "Attributes to modify object",
      "typeclass": "dictionary",
      "required": true,
      "addedManually": true
    }
  },
  "exits": {
    "error": {
      "example": undefined
    },
    "success": {
      "void": true,
      "friendlyName": "then",
      "variableName": "result",
      "description": "Normal outcome."
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    User
      .findOne(inputs.id)
      .exec(function(err, user) {
        console.log(err);
        console.log(user);
        if (err) {
          return exits.error();
        } else {
          return exits.success(user);
        }
      });
  },
  "identity": "ModifyModel"
};