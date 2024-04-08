const userRouter = require("express").Router();
const UserController = require("../controller/UserController");

userRouter.get("/", UserController.GetUsers);

userRouter
  .route("/:id")
  .delete(UserController.DeleteUser)
  .put(UserController.EditUser);

userRouter.post("/login", UserController.Login);
userRouter.post("/register", UserController.Register);

module.exports = userRouter;
