var Machine = require("machine");
module.exports = {
    put_update: function(req, res) {
        Machine.build({
            inputs: {
                "email": {
                    "example": "scott",
                    "required": true
                },
                "username": {
                    "example": "scott"
                },
                "newPassword": {
                    "example": "abc123",
                    "required": true
                },
                "currentPassword": {
                    "example": "l0lcatzz",
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
                        // If defined
                        sails.machines['4bf9c923-efd3-4077-b3e1-6b8d84d740c0_0.3.0'].ifDefined({
                            "value": inputs.newPassword
                        }).exec({
                            "error": function(ifDefined) {
                                return exits.error({
                                    data: ifDefined,
                                    status: 500
                                });

                            },
                            "otherwise": function(ifDefined) {
                                // Find One User
                                sails.machines['_project_3202_0.0.3'].findOne_user({}).setEnvironment({
                                    sails: sails
                                }).exec({
                                    "success": function(findOneUser3) {
                                        return exits.respond({
                                            data: "That email address is already in use.",
                                            action: "respond_with_value_and_status",
                                            status: "403"
                                        });

                                    },
                                    "error": function(findOneUser3) {
                                        return exits.error({
                                            data: findOneUser3,
                                            status: 500
                                        });

                                    },
                                    "notFound": function(findOneUser3) {
                                        // Get image URL
                                        sails.machines['af6a106f-a2cc-4170-a08a-86f2f5eabc38_1.1.4'].getImageUrl({
                                            "emailAddress": inputs.email,
                                            "gravatarSize": 500
                                        }).exec({
                                            "error": function(getImageURL2) {
                                                return exits.error({
                                                    data: getImageURL2,
                                                    status: 500
                                                });

                                            },
                                            "encodingFailed": function(getImageURL2) {
                                                return exits.error({
                                                    data: getImageURL2,
                                                    status: 500
                                                });

                                            },
                                            "success": function(getImageURL2) {
                                                // Update User
                                                sails.machines['_project_3202_0.0.3'].update_user({
                                                    "email": inputs.email,
                                                    "gravatar": getImageURL2,
                                                    "username": inputs.username,
                                                    "criteria": {
                                                        id: loadSessionData
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

                                    }
                                });

                            },
                            "success": function(ifDefined) {
                                // Find One User
                                sails.machines['_project_3202_0.0.3'].findOne_user({
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
                                                    data: "The provided current password is incorrect.",
                                                    action: "respond_with_value_and_status",
                                                    status: 500
                                                });

                                            },
                                            "success": function(checkPassword) {
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
                                                        // Find One User
                                                        sails.machines['_project_3202_0.0.3'].findOne_user({
                                                            "criteria": {
                                                                email: inputs.email
                                                            }
                                                        }).setEnvironment({
                                                            sails: sails
                                                        }).exec({
                                                            "success": function(findOneUser2) {
                                                                return exits.respond({
                                                                    data: "That email address is already in use.",
                                                                    action: "respond_with_value_and_status",
                                                                    status: "403"
                                                                });

                                                            },
                                                            "error": function(findOneUser2) {
                                                                return exits.error({
                                                                    data: findOneUser2,
                                                                    status: 500
                                                                });

                                                            },
                                                            "notFound": function(findOneUser2) {
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
                                                                        // Update User
                                                                        sails.machines['_project_3202_0.0.3'].update_user({
                                                                            "email": inputs.email,
                                                                            "password": encryptPassword,
                                                                            "gravatar": getImageURL,
                                                                            "username": inputs.username,
                                                                            "criteria": {
                                                                                id: loadSessionData
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
                        sails.machines['_project_3202_0.0.3'].findOne_user({
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
                                        gravatar: (findOneUser && findOneUser.gravatar)
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