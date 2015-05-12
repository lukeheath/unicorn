module.exports.routes = {
  "post /forgot": "ForgotController.create",
  "post /integration/facebook": "IntegrationController.facebook",
  "post /me/reset": "MeController.reset",
  "put /me": "MeController.put_update",
  "get /me": "MeController.get_find",
  "get /integration/user": "IntegrationController.user",
  "post /user": "UserController.post_create",
  "get /user": "UserController.get_find",
  "post /logout": "LogoutController.create",
  "get /": "Home$Controller.find",
  "get /integration": "IntegrationController.find",
  "post /me/authenticate": "MeController.authenticate",
  "get /user/facebook": "UserController.facebook",
  "post /login": "LoginController.create",
  "get /user/:id": "UserController.get_$id",
  "delete /user/:id": "UserController.delete_$id"
};