var Machine = require("machine");
module.exports = {
    post_create: function(req, res) {
        Machine.build({
            inputs: {
                "email": {
                    "example": "scott",
                    "required": true
                },
                "password": {
                    "example": "scott",
                    "required": true
                },
                "username": {
                    "example": "scott",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                return exits.respond({
                    action: 'compiler_error'
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    delete_$id: function(req, res) {
        Machine.build({
            inputs: {
                "id": {
                    "example": "abc123",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Destroy User
                sails.machines['_project_3202_0.0.6'].destroy_user({
                    "criteria": {
                        id: inputs.id
                    }
                }).setEnvironment({
                    sails: sails
                }).exec({
                    "success": function(destroyUser) {
                        return exits.respond({
                            data: destroyUser,
                            action: "respond_with_result_and_status",
                            status: 200
                        });

                    },
                    "error": function(destroyUser) {
                        return exits.error({
                            data: destroyUser,
                            status: 500
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    get_find: function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // List (Blueprint) User
                sails.machines['_project_3202_0.0.6'].blueprintFind_user({}).setEnvironment({
                    req: req,
                    sails: sails
                }).exec({
                    "success": function(listBlueprintUser) {
                        return exits.respond({
                            data: listBlueprintUser,
                            action: "respond_with_result_and_status",
                            status: 200
                        });

                    },
                    "error": function(listBlueprintUser) {
                        return exits.error({
                            data: listBlueprintUser,
                            status: 500
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    get_$id: function(req, res) {
        Machine.build({
            inputs: {
                "id": {
                    "example": "abc123",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Find One User
                sails.machines['_project_3202_0.0.6'].findOne_user({
                    "criteria": {
                        id: inputs.id
                    }
                }).setEnvironment({
                    sails: sails
                }).exec({
                    "success": function(findOneUser) {
                        return exits.respond({
                            data: findOneUser,
                            action: "respond_with_result_and_status",
                            status: 200
                        });

                    },
                    "error": function(findOneUser) {
                        return exits.error({
                            data: findOneUser,
                            status: 500
                        });

                    },
                    "notFound": function(findOneUser) {
                        return exits.error({
                            data: findOneUser,
                            status: 500
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    facebook: function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Get Facebook login URL
                sails.machines['c8d25931-bf1e-4997-be03-18e7c605d85a_1.0.5'].getLoginUrl({
                    "appId": "1384771718517334",
                    "callbackUrl": "http://localhost:1337/integration/",
                    "permissions": ["user_friends", "email", "public_profile"]
                }).exec({
                    "error": function(getFacebookLoginURL) {
                        return exits.error({
                            data: getFacebookLoginURL,
                            status: 500
                        });

                    },
                    "success": function(getFacebookLoginURL) {
                        return exits.respond({
                            data: getFacebookLoginURL,
                            action: "respond_with_value_and_status",
                            status: 200
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};