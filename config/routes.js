module.exports.routes = {
  "post /login": "LoginController.create",
  "get /user": "UserController.get_find",
  "post /forgot": "ForgotController.create",
  "put /me": "MeController.put_update",
  "post /me/reset": "MeController.reset",
  "post /me/authenticate": "MeController.authenticate",
  "get /integration": "IntegrationController.find",
  "get /integration/user": "IntegrationController.user",
  "post /integration/facebook": "IntegrationController.facebook",
  "post /user": "UserController.post_create",
  "get /me": "MeController.get_find",
  "get /": "Home$Controller.find",
  "post /logout": "LogoutController.create",
  "get /user/facebook": "UserController.facebook",
  "delete /user/:id": "UserController.delete_$id",
  "get /user/:id": "UserController.get_$id"
};