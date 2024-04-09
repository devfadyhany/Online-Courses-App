import express from "express";
import {
  GetUsers,
  DeleteUser,
  EditUser,
  Login,
  Register,
} from "../controller/UserController.js";

const userRouter = express.Router();

userRouter.get("/", GetUsers);

userRouter.route("/:id").delete(DeleteUser).put(EditUser);

userRouter.post("/login", Login);
userRouter.post("/register", Register);

export default userRouter;