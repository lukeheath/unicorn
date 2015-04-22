var Machine = require("machine");
module.exports = {
    create: function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Delete session key
                sails.machines['0ab17fbc-e31c-430d-85a4-929318f5e715_0.3.1'].del({
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
                            data: null,
                            action: "display_view",
                            status: 200,
                            view: "homepage"
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