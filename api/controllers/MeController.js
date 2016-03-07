var Machine = require("machine");
module.exports = {
    'reset': function(req, res) {
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
                return exits.respond({
                    action: 'compiler_error'
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
                // Load session data
                sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.4.0'].load({
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
                        sails.machines['_project_3202_0.0.15'].findOne_user({
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
    },
    'put_update': function(req, res) {
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
                    "example": "scott",
                    "required": true
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
                return exits.respond({
                    action: 'compiler_error'
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    'authenticate': function(req, res) {
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
                return exits.respond({
                    action: 'compiler_error'
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};