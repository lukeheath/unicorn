var Machine = require("machine");
module.exports = {
    put_update: function(req, res) {
        Machine.build({
            inputs: {
                "username": {
                    "example": "scott"
                },
                "email": {
                    "example": "scott"
                },
                "password": {
                    "example": "scott"
                },
                "gravatar": {
                    "example": "scott"
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
                        return exits.respond({
                            action: "respond_with_status",
                            status: 500
                        });

                    },
                    "success": function(loadSessionData) {
                        // Update User
                        sails.machines['_project_3202_0.0.0'].update_user({
                            "username": inputs.username,
                            "email": inputs.email,
                            "password": inputs.password,
                            "gravatar": inputs.gravatar,
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
                            status: "401"
                        });

                    },
                    "success": function(loadSessionData) {
                        // Find One User
                        sails.machines['_project_3202_0.0.0'].findOne_user({
                            "criteria": {
                                id: loadSessionData
                            }
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "success": function(findOneUser) {
                                return exits.respond({
                                    data: findOneUser,
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