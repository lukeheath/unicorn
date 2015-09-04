module.exports.routes = {
  "post /forgot": {
    "target": "ForgotController.create"
  },
  "get /me": {
    "target": "MeController.get_find"
  },
  "post /login": {
    "target": "LoginController.create"
  },
  "post /integration/facebook": {
    "target": "IntegrationController.facebook"
  },
  "get /user": {
    "target": "UserController.get_find"
  },
  "post /me/reset": {
    "target": "MeController.reset"
  },
  "get /": {
    "target": "Home$Controller.find"
  },
  "post /user": {
    "target": "UserController.post_create"
  },
  "post /me/authenticate": {
    "target": "MeController.authenticate"
  },
  "get /integration/user": {
    "target": "IntegrationController.user"
  },
  "post /test": {
    "target": "TestController.create"
  },
  "post /logout": {
    "target": "LogoutController.create"
  },
  "get /integration": {
    "target": "IntegrationController.find"
  },
  "put /me": {
    "target": "MeController.put_update"
  },
  "get /user/facebook": {
    "target": "UserController.facebook"
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