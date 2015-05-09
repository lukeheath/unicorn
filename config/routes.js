module.exports.routes = {
  "get /integration": "IntegrationController.find",
  "post /forgot": "ForgotController.create",
  "post /me/reset": "MeController.reset",
  "post /integration/facebook": "IntegrationController.facebook",
  "get /me": "MeController.get_find",
  "post /me/authenticate": "MeController.authenticate",
  "get /integration/user": "IntegrationController.user",
  "post /logout": "LogoutController.create",
  "get /": "Home$Controller.find",
  "post /login": "LoginController.create",
  "get /user": "UserController.get_find",
  "post /user": "UserController.post_create",
  "get /user/facebook": "UserController.facebook",
  "put /me": "MeController.put_update",
  "get /user/:id": "UserController.get_$id",
  "delete /user/:id": "UserController.delete_$id"
};