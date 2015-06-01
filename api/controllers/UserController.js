var Machine = require("machine");
module.exports = {
    'post_create': function(req, res) {
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
                // Get image URL
                sails.machines['af6a106f-a2cc-4170-a08a-86f2f5eabc38_1.1.4'].getImageUrl({
                    "emailAddress": inputs.email,
                    "gravatarSize": 500,
                    "defaultImage": "http://thecatapi.com/api/images/get?format=src&size=small&type=jpg"
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
                                // Load session data
                                sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.3.1'].load({
                                    "key": "integrationId"
                                }).setEnvironment({
                                    req: req
                                }).exec({
                                    "error": function(loadSessionData) {
                                        return exits.error({
                                            data: loadSessionData,
                                            status: 500
                                        });

                                    },
                                    "notFound": function(loadSessionData) {
                                        // Create User
                                        sails.machines['_project_3202_0.0.7'].create_user({
                                            "email": inputs.email,
                                            "password": encryptPassword,
                                            "avatarUrl": getImageURL,
                                            "username": inputs.username,
                                            "authToken": "null"
                                        }).setEnvironment({
                                            sails: sails
                                        }).exec({
                                            "success": function(createUser2) {
                                                // Save to session
                                                sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.3.1'].save({
                                                    "key": "userId",
                                                    "value": (createUser2 && createUser2.id)
                                                }).setEnvironment({
                                                    req: req
                                                }).exec({
                                                    "error": function(saveToSession2) {
                                                        return exits.error({
                                                            data: saveToSession2,
                                                            status: 500
                                                        });

                                                    },
                                                    "success": function(saveToSession2) {
                                                        return exits.respond({
                                                            action: "respond_with_status",
                                                            status: 200
                                                        });

                                                    }
                                                });

                                            },
                                            "error": function(createUser2) {
                                                return exits.error({
                                                    data: createUser2,
                                                    status: 500
                                                });

                                            }
                                        });

                                    },
                                    "success": function(loadSessionData) {
                                        // Create User
                                        sails.machines['_project_3202_0.0.7'].create_user({
                                            "email": inputs.email,
                                            "password": encryptPassword,
                                            "avatarUrl": getImageURL,
                                            "username": inputs.username,
                                            "authToken": "null"
                                        }).setEnvironment({
                                            sails: sails
                                        }).exec({
                                            "success": function(createUser) {
                                                // Update Integration
                                                sails.machines['_project_3202_0.0.7'].update_integration({
                                                    "criteria": {
                                                        id: loadSessionData
                                                    }
                                                }).setEnvironment({
                                                    sails: sails
                                                }).exec({
                                                    "success": function(updateIntegration) {
                                                        // Save to session
                                                        sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.3.1'].save({
                                                            "key": "userId",
                                                            "value": (createUser && createUser.id)
                                                        }).setEnvironment({
                                                            req: req
                                                        }).exec({
                                                            "error": function(saveToSession) {
                                                                return exits.error({
                                                                    data: saveToSession,
                                                                    status: 500
                                                                });

                                                            },
                                                            "success": function(saveToSession) {
                                                                return exits.respond({
                                                                    action: "respond_with_status",
                                                                    status: 200
                                                                });

                                                            }
                                                        });

                                                    },
                                                    "error": function(updateIntegration) {
                                                        return exits.error({
                                                            data: updateIntegration,
                                                            status: 500
                                                        });

                                                    }
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
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    'get_find': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // List (Blueprint) User
                sails.machines['_project_3202_0.0.7'].blueprintFind_user({}).setEnvironment({
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
    'delete_$id': function(req, res) {
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
                sails.machines['_project_3202_0.0.7'].destroy_user({
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
    'get_$id': function(req, res) {
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
                sails.machines['_project_3202_0.0.7'].findOne_user({
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
    'facebook': function(req, res) {
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