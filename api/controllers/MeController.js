var Machine = require("machine");
module.exports = {
    reset: function(req, res) {
        Machine.build({
            inputs: {
                "token": {
                    "example": "abc123",
                    "required": true
                },
                "password": {
                    "example": "l0lcatzz",
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
                        authToken: inputs.token
                    }
                }).setEnvironment({
                    sails: sails
                }).exec({
                    "success": function(findOneUser) {
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
                                // Update User
                                sails.machines['_project_3202_0.0.7'].update_user({
                                    "password": encryptPassword,
                                    "criteria": {
                                        id: (findOneUser && findOneUser.id)
                                    }
                                }).setEnvironment({
                                    sails: sails
                                }).exec({
                                    "success": function(updateUser) {
                                        return exits.respond({
                                            action: "respond_with_status",
                                            status: 200
                                        });

                                    },
                                    "error": function(updateUser) {
                                        return exits.error({
                                            data: updateUser,
                                            status: 500
                                        });

                                    }
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
                        return exits.respond({
                            data: "Invalid authorization code.",
                            action: "respond_with_value_and_status",
                            status: "404"
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    authenticate: function(req, res) {
        Machine.build({
            inputs: {
                "token": {
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
                        authToken: inputs.token
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
                                // Update User
                                sails.machines['_project_3202_0.0.7'].update_user({
                                    "authToken": "null",
                                    "criteria": {
                                        id: (findOneUser && findOneUser.id)
                                    }
                                }).setEnvironment({
                                    sails: sails
                                }).exec({
                                    "success": function(updateUser) {
                                        return exits.respond({
                                            action: "respond_with_status",
                                            status: 200
                                        });

                                    },
                                    "error": function(updateUser) {
                                        return exits.error({
                                            data: updateUser,
                                            status: 500
                                        });

                                    }
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
                        return exits.respond({
                            data: "Invalid authorization code: " + inputs.token,
                            action: "respond_with_value_and_status",
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
    put_update: function(req, res) {
        Machine.build({
            inputs: {
                "currentPassword": {
                    "example": "l0lcatzz",
                    "required": true
                },
                "email": {
                    "example": "john@doe-enterprises.com",
                    "required": true
                },
                "username": {
                    "example": "scott"
                },
                "newPassword": {
                    "example": "abc123",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Load session data
                sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.3.1'].load({
                    "key": "userId"
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
                        // Find One User
                        sails.machines['_project_3202_0.0.7'].findOne_user({
                            "criteria": {
                                id: loadSessionData
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(findOneUser) {
                                // Check password
                                sails.machines['e05a71f7-485d-443a-803e-029b84fe73a4_2.2.0'].checkPassword({
                                    "passwordAttempt": inputs.currentPassword,
                                    "encryptedPassword": (findOneUser && findOneUser.password)
                                }).exec({
                                    "error": function(checkPassword) {
                                        return exits.error({
                                            data: checkPassword,
                                            status: 500
                                        });

                                    },
                                    "incorrect": function(checkPassword) {
                                        return exits.respond({
                                            data: "You entered an incorrect password. Please try again.",
                                            action: "respond_with_value_and_status",
                                            status: 500
                                        });

                                    },
                                    "success": function(checkPassword) {
                                        // Get image URL
                                        sails.machines['af6a106f-a2cc-4170-a08a-86f2f5eabc38_1.1.4'].getImageUrl({
                                            "emailAddress": inputs.email,
                                            "gravatarSize": 500
                                        }).exec({
                                            "error": function(getImageURL) {
                                                return exits.error({
                                                    data: getImageURL,
                                                    status: 500
                                                });

                                            },
                                            "encodingFailed": function(getImageURL) {
                                                return exits.error({
                                                    data: getImageURL,
                                                    status: 500
                                                });

                                            },
                                            "success": function(getImageURL) {
                                                // If equal (===)
                                                sails.machines['4bf9c923-efd3-4077-b3e1-6b8d84d740c0_0.3.0'].ifEqual({
                                                    "a": inputs.newPassword,
                                                    "b": "null"
                                                }).exec({
                                                    "error": function(ifEqual) {
                                                        return exits.error({
                                                            data: ifEqual,
                                                            status: 500
                                                        });

                                                    },
                                                    "otherwise": function(ifEqual) {
                                                        // Encrypt password
                                                        sails.machines['e05a71f7-485d-443a-803e-029b84fe73a4_2.2.0'].encryptPassword({
                                                            "password": inputs.newPassword
                                                        }).exec({
                                                            "error": function(encryptPassword) {
                                                                return exits.error({
                                                                    data: encryptPassword,
                                                                    status: 500
                                                                });

                                                            },
                                                            "success": function(encryptPassword) {
                                                                // Update User
                                                                sails.machines['_project_3202_0.0.7'].update_user({
                                                                    "email": inputs.email,
                                                                    "password": encryptPassword,
                                                                    "username": inputs.username,
                                                                    "criteria": {
                                                                        id: (findOneUser && findOneUser.id)
                                                                    }
                                                                }).setEnvironment({
                                                                    sails: sails
                                                                }).exec({
                                                                    "success": function(updateUser2) {
                                                                        return exits.respond({
                                                                            data: updateUser2,
                                                                            action: "respond_with_result_and_status",
                                                                            status: 200
                                                                        });

                                                                    },
                                                                    "error": function(updateUser2) {
                                                                        return exits.error({
                                                                            data: updateUser2,
                                                                            status: 500
                                                                        });

                                                                    }
                                                                });

                                                            }
                                                        });

                                                    },
                                                    "success": function(ifEqual) {
                                                        // Update User
                                                        sails.machines['_project_3202_0.0.7'].update_user({
                                                            "email": inputs.email,
                                                            "username": inputs.username,
                                                            "criteria": {
                                                                id: (findOneUser && findOneUser.id)
                                                            }
                                                        }).setEnvironment({
                                                            sails: sails
                                                        }).exec({
                                                            "success": function(updateUser) {
                                                                return exits.respond({
                                                                    data: updateUser,
                                                                    action: "respond_with_result_and_status",
                                                                    status: 200
                                                                });

                                                            },
                                                            "error": function(updateUser) {
                                                                return exits.error({
                                                                    data: updateUser,
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
                // Load session data
                sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.3.1'].load({
                    "key": "userId"
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
                        return exits.respond({
                            action: "respond_with_status",
                            status: "403"
                        });

                    },
                    "success": function(loadSessionData) {
                        // Find One User
                        sails.machines['_project_3202_0.0.7'].findOne_user({
                            "criteria": {
                                id: loadSessionData
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(findOneUser) {
                                return exits.respond({
                                    data: {
                                        id: (findOneUser && findOneUser.id),
                                        email: (findOneUser && findOneUser.email),
                                        username: (findOneUser && findOneUser.username),
                                        avatarUrl: (findOneUser && findOneUser.avatarUrl)
                                    },
                                    action: "respond_with_value_and_status",
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
                                    status: "404"
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