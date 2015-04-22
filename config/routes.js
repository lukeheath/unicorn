module.exports.routes = {
  "put /me": "MeController.put_update",
  "post /logout": "LogoutController.create",
  "get /me": "MeController.get_find",
  "post /login": "LoginController.create",
  "post /user": "UserController.post_create",
  "get /user": "UserController.get_find",
  "get /": "Home$Controller.find",
  "get /user/:id": "UserController.get_$id",
  "delete /user/:id": "UserController.delete_$id"
};