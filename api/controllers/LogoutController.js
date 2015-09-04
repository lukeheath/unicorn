var Machine = require("machine");
module.exports = {
    'create': function(req, res) {
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
                        // If defined
                        sails.machines['4bf9c923-efd3-4077-b3e1-6b8d84d740c0_1.2.0'].ifDefined({
                            "value": loadSessionData
                        }).exec({
                            "error": function(ifDefined) {
                                return exits.error({
                                    data: ifDefined,
                                    status: 500
                                });

                            },
                            "otherwise": function(ifDefined) {
                                return exits.respond({
                                    action: "respond_with_status",
                                    status: "403"
                                });

                            },
                            "success": function(ifDefined) {
                                // Delete session key
                                sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.4.0'].del({
                                    "key": "userId"
                                }).setEnvironment({
                                    req: req
                                }).exec({
                                    "error": function(deleteSessionKey) {
                                        return exits.error({
                                            data: deleteSessionKey,
                                            status: 500
                                        });

                                    },
                                    "success": function(deleteSessionKey) {
                                        return exits.respond({
                                            action: "respond_with_status",
                                            status: 200,
                                            view: "homepage"
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