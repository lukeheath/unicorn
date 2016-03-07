module.exports.routes = {
  "get /user/facebook": {
    "target": "UserController.facebook"
  },
  "get /user": {
    "target": "UserController.get_find"
  },
  "post /logout": {
    "target": "LogoutController.create"
  },
  "get /": {
    "target": "Home$Controller.find"
  },
  "get /integration": {
    "target": "IntegrationController.find"
  },
  "get /integration/user": {
    "target": "IntegrationController.user"
  },
  "get /me": {
    "target": "MeController.get_find"
  },
  "put /me": {
    "target": "MeController.put_update"
  },
  "post /login": {
    "target": "LoginController.create"
  },
  "post /me/authenticate": {
    "target": "MeController.authenticate"
  },
  "post /integration/facebook": {
    "target": "IntegrationController.facebook"
  },
  "post /test": {
    "target": "TestController.create"
  },
  "post /me/reset": {
    "target": "MeController.reset"
  },
  "post /forgot": {
    "target": "ForgotController.create"
  },
  "post /user": {
    "target": "UserController.post_create"
  },
  "get /user/:id": {
    "target": "UserController.get_$id",
    "skipAssets": true
  },
  "delete /user/:id": {
    "target": "UserController.delete_$id",
    "skipAssets": true
  }
};