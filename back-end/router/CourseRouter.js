const courseRouter = require("express").Router();
const CourseController = require("../controller/CourseController");

courseRouter.route("/").get(CourseController.GetCourses).post(CourseController.AddCourse);
courseRouter
  .route("/:id")
  .get(CourseController.GetCourseById)
  .delete(CourseController.DeleteCourse)
  .put(CourseController.EditCourse);

module.exports = courseRouter;
