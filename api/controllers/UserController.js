var Machine = require("machine");
module.exports = {
    post_create: function(req, res) {
        Machine.build({
            inputs: {
                "username": {
                    "example": "scott",
                    "required": true
                },
                "email": {
                    "example": "scott",
                    "required": true
                },
                "password": {
                    "example": "scott",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Get image URL
                sails.machines['af6a106f-a2cc-4170-a08a-86f2f5eabc38_1.1.4'].getImageUrl({
                    "emailAddress": inputs.email
                }).exec({
                    "error": function(getImageURL) {
                        return exits.error({
                            data: getImageURL,
                            status: 500
                        });

                    },
                    "encodingFailed": function(getImageURL) {
                        return exits.respond({
                            action: "respond_with_status",
                            status: 500
                        });

                    },
                    "success": function(getImageURL) {
                        // Encrypt password
                        sails.machines['e05a71f7-485d-443a-803e-029b84fe73a4_2.2.0'].encryptPassword({
                            "password": inputs.password
                        }).exec({
                            "error": function(encryptPassword) {
                                return exits.error({
                                    data: encryptPassword,
                                    status: 500
                                });

                            },
                            "success": function(encryptPassword) {
                                // Create User
                                sails.machines['_project_3202_0.0.0'].create_user({
                                    "username": inputs.username,
                                    "email": inputs.email,
                                    "password": encryptPassword,
                                    "gravatar": getImageURL
                                }).setEnvironment({
                                    sails: sails
                                }).exec({
                                    "success": function(createUser) {
                                        return exits.respond({
                                            data: createUser,
                                            action: "respond_with_result_and_status",
                                            status: 200
                                        });

                                    },
                                    "error": function(createUser) {
                                        return exits.error({
                                            data: createUser,
                                            status: 500
                                        });

                                    }
                                });

                            }
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
                sails.machines['_project_3202_0.0.0'].blueprintFind_user({}).setEnvironment({
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
                sails.machines['_project_3202_0.0.0'].destroy_user({
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
                sails.machines['_project_3202_0.0.0'].findOne_user({
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
                        return exits.respond({
                            action: "respond_with_status",
                            status: 500
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