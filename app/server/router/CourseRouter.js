import express from "express";
import {GetCourses, AddCourse, GetCourse, DeleteCourse, EditCourse} from "../controller/CourseController.js";

const courseRouter = express.Router();

courseRouter.route("/").get(GetCourses).post(AddCourse);
courseRouter.route("/:id").get(GetCourse).delete(DeleteCourse).put(EditCourse);
courseRouter.use("/img", express.static("Images/course"))

export default courseRouter;
