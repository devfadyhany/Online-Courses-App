import express from "express";
import {
  GetCourses,
  AddCourse,
  GetCourse,
  DeleteCourse,
  EditCourse,
  InstructorCourses,
} from "../controller/CourseController.js";
import { courseImageUpload } from "../controller/Uploader.js";

const courseRouter = express.Router();

courseRouter.route("/").get(GetCourses).post(AddCourse);
courseRouter.post(
  "/uploadImage",
  courseImageUpload.single("image"),
  (req, res) => {
    res.send("Image Uploaded Successfully");
  }
);
courseRouter.get("/instructor/:userId", InstructorCourses);
courseRouter.route("/:id").get(GetCourse).delete(DeleteCourse).put(EditCourse);
courseRouter.use("/img", express.static("Images/course"));

export default courseRouter;
