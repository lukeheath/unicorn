module.exports.routes = {
  "post /forgot": {
    "target": "ForgotController.create"
  },
  "get /integration": {
    "target": "IntegrationController.find"
  },
  "get /user": {
    "target": "UserController.get_find"
  },
  "post /logout": {
    "target": "LogoutController.create"
  },
  "post /integration/facebook": {
    "target": "IntegrationController.facebook"
  },
  "get /user/facebook": {
    "target": "UserController.facebook"
  },
  "post /user": {
    "target": "UserController.post_create"
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
  "get /integration/user": {
    "target": "IntegrationController.user"
  },
  "post /test": {
    "target": "TestController.create"
  },
  "post /me/authenticate": {
    "target": "MeController.authenticate"
  },
  "get /": {
    "target": "Home$Controller.find"
  },
  "post /me/reset": {
    "target": "MeController.reset"
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