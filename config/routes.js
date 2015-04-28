module.exports.routes = {
  "post /integration/facebook": "IntegrationController.facebook",
  "get /integration": "IntegrationController.find",
  "get /me": "MeController.get_find",
  "post /logout": "LogoutController.create",
  "get /integration/user": "IntegrationController.user",
  "post /user": "UserController.post_create",
  "get /user": "UserController.get_find",
  "get /test": "TestController.find",
  "get /user/facebook": "UserController.facebook",
  "put /me": "MeController.put_update",
  "get /": "Home$Controller.find",
  "post /login": "LoginController.create",
  "delete /user/:id": "UserController.delete_$id",
  "get /user/:id": "UserController.get_$id"
};