const userRouter = require("express").Router();
const UserController = require("../controller/UserController");

userRouter.route("/").get(UserController.GetUsers).post(UserController.AddUser);
userRouter
  .route("/:id")
  .get(UserController.GetUserById)
  .delete(UserController.DeleteUser)
  .put(UserController.EditUser);
userRouter.get("/login", UserController.Login);

module.exports = userRouter;
