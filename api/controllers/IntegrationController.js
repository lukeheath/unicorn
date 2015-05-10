var Machine = require("machine");
module.exports = {
    find: function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                return exits.respond({
                    action: "display_view",
                    status: 200,
                    view: "integration",
                    data: undefined
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    user: function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
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
                        return exits.error({
                            data: loadSessionData,
                            status: 500
                        });

                    },
                    "success": function(loadSessionData) {
                        // Find One Integration
                        sails.machines['_project_3202_0.0.7'].findOne_integration({
                            "criteria": {
                                id: loadSessionData
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(findOneIntegration) {
                                return exits.respond({
                                    data: findOneIntegration,
                                    action: "respond_with_result_and_status",
                                    status: 200
                                });

                            },
                            "error": function(findOneIntegration) {
                                return exits.error({
                                    data: findOneIntegration,
                                    status: 500
                                });

                            },
                            "notFound": function(findOneIntegration) {
                                return exits.error({
                                    data: findOneIntegration,
                                    status: 500
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
    facebook: function(req, res) {
        Machine.build({
            inputs: {
                "code": {
                    "example": "AQDvCav5zRSafS795TckAerUV53xzgqRyrcfYX2i_PJFObCvACVRP-V7sfemiMPBh3TWypvagfZ6aoqfwKCNcBxg8XR_skdYUe5tsY9UzX9Z_8q4mRrqaLhwSh5OHj9ORmE4ocyd-neZtdceTZjlmEVeO38UH9QOe_md7h5hy2gMhOS6TL9IBk5Guxg3O6I0WmjpFNPoj6JzWIvG9cgj7RQqxMA2q_8EJxGPTqEbmTqOBqqCIOlvPEPCeIiy21VD9__tuzB0JvgqbVh-U_WW8mjwGBqsfxlNvjYwIxk4zBNAxuRJijkkn0TwyogFpZqIlkY",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Get access token
                sails.machines['c8d25931-bf1e-4997-be03-18e7c605d85a_1.0.5'].getAccessToken({
                    "appId": "1384771718517334",
                    "appSecret": "afa16e13a3cec1709549ee1783da932e",
                    "code": inputs.code,
                    "callbackUrl": "http://localhost:1337/integration/"
                }).exec({
                    "error": function(getAccessToken) {
                        return exits.error({
                            data: getAccessToken,
                            status: 500
                        });

                    },
                    "success": function(getAccessToken) {
                        // Get user by access token
                        sails.machines['c8d25931-bf1e-4997-be03-18e7c605d85a_1.0.5'].getUserByAccessToken({
                            "accessToken": (getAccessToken && getAccessToken.token)
                        }).exec({
                            "error": function(getUserByAccessToken) {
                                return exits.error({
                                    data: getUserByAccessToken,
                                    status: 500
                                });

                            },
                            "success": function(getUserByAccessToken) {
                                // Find One User
                                sails.machines['_project_3202_0.0.7'].findOne_user({
                                    "criteria": {
                                        email: (getUserByAccessToken && getUserByAccessToken.email)
                                    }
                                }).setEnvironment({
                                    sails: sails
                                }).exec({
                                    "success": function(findOneUser) {
                                        // Save to session
                                        sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.3.1'].save({
                                            "key": "userId",
                                            "value": (findOneUser && findOneUser.id)
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
                                                    data: "login",
                                                    action: "respond_with_value_and_status",
                                                    status: 200
                                                });

                                            }
                                        });

                                    },
                                    "error": function(findOneUser) {
                                        return exits.error({
                                            data: findOneUser,
                                            status: 500
                                        });

                                    },
                                    "notFound": function(findOneUser) {
                                        // Stringify as JSON
                                        sails.machines['28cce2cd-1991-493d-8a0d-1532d85db9a8_1.0.0'].stringify({
                                            "value": getUserByAccessToken
                                        }).exec({
                                            "error": function(stringifyAsJSON) {
                                                return exits.error({
                                                    data: stringifyAsJSON,
                                                    status: 500
                                                });

                                            },
                                            "couldNotStringify": function(stringifyAsJSON) {
                                                return exits.error({
                                                    data: stringifyAsJSON,
                                                    status: 500
                                                });

                                            },
                                            "success": function(stringifyAsJSON) {
                                                // Create Integration
                                                sails.machines['_project_3202_0.0.7'].create_integration({
                                                    "email": (getUserByAccessToken && getUserByAccessToken.email),
                                                    "userId": "0",
                                                    "type": "facebook",
                                                    "meta": stringifyAsJSON
                                                }).setEnvironment({
                                                    sails: sails
                                                }).exec({
                                                    "success": function(createIntegration) {
                                                        // Save to session
                                                        sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.3.1'].save({
                                                            "key": "integrationId",
                                                            "value": (createIntegration && createIntegration.id)
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
                                                    "error": function(createIntegration) {
                                                        return exits.error({
                                                            data: createIntegration,
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
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};