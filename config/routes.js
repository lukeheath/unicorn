module.exports.routes = {
  "post /user": "UserController.post_create",
  "get /user": "UserController.get_find",
  "get /": "Home$Controller.find",
  "get /user/:id": "UserController.get_$id",
  "delete /user/:id": "UserController.delete_$id",
  "put /user/:id": "UserController.put_$id"
};