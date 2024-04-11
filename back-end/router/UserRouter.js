import express from "express";
import {
  GetUsers,
  DeleteUser,
  EditUser,
  Login,
  Register,
} from "../controller/UserController.js";
import { profileImageUpload } from "../controller/Uploader.js";

const userRouter = express.Router();

userRouter.get("/", GetUsers);

userRouter.use("/img", express.static("Images/profile"))

userRouter.route("/:id").delete(DeleteUser).put(EditUser);

userRouter.post("/login", Login);
userRouter.post("/register", profileImageUpload.single("image"), Register);

export default userRouter;