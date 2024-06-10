import express from "express";
import {
  GetUsers,
  DeleteUser,
  EditUser,
  Login,
  Register,
  GetUser,
} from "../controller/UserController.js";
import { profileImageUpload } from "../controller/Uploader.js";

const userRouter = express.Router();

userRouter.get("/", GetUsers);
userRouter.use("/img", express.static("Images/profile"));
userRouter.route("/:id").get(GetUser).delete(DeleteUser).put(EditUser);
userRouter.post("/login", Login);
userRouter.post(
  "/uploadImage",
  profileImageUpload.single("image"),
  (req, res) => {
    res.send("Image Uploaded Successfully");
  }
);
userRouter.post("/register", Register);

export default userRouter;
