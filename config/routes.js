module.exports.routes = {
  "post /me/authenticate": "MeController.authenticate",
  "put /me": "MeController.put_update",
  "post /forgot": "ForgotController.create",
  "post /logout": "LogoutController.create",
  "get /integration/user": "IntegrationController.user",
  "get /me": "MeController.get_find",
  "post /me/reset": "MeController.reset",
  "post /login": "LoginController.create",
  "get /user": "UserController.get_find",
  "post /integration/facebook": "IntegrationController.facebook",
  "get /integration": "IntegrationController.find",
  "get /": "Home$Controller.find",
  "get /user/facebook": "UserController.facebook",
  "post /user": "UserController.post_create",
  "get /user/:id": "UserController.get_$id",
  "delete /user/:id": "UserController.delete_$id"
};