module.exports.routes = {
  "put /me": "MeController.put_update",
  "get /integration/user": "IntegrationController.user",
  "get /integration": "IntegrationController.find",
  "get /me": "MeController.get_find",
  "post /user": "UserController.post_create",
  "post /integration/facebook": "IntegrationController.facebook",
  "post /login": "LoginController.create",
  "get /user": "UserController.get_find",
  "get /test": "TestController.find",
  "get /user/facebook": "UserController.facebook",
  "post /logout": "LogoutController.create",
  "get /": "Home$Controller.find",
  "delete /user/:id": "UserController.delete_$id",
  "get /user/:id": "UserController.get_$id"
};