const CourseModel = require("../models/CourseModel");

class CourseController {
  static GetCourses = async (req, res) => {
    try {
      const data = await CourseModel.GetCourses();

      if (data.length != 0) {
        return res.status(200).send({ status: 200, data: data });
      }

      return res
        .status(404)
        .send({ status: 404, message: "No courses have been found." });
    } catch (err) {
      return res.status(500).send({ status: 500, message: err.message });
    }
  };

  static GetCourseById = async (req, res) => {
    try {
      const id = req.params.id;

      const data = await CourseModel.GetCourseById(id);

      if (data.length != 0) {
        return res.status(200).send({ status: 200, data: data[0] });
      }

      return res.status(404).send({
        status: 404,
        message: "Couldn't find a course with this id.",
      });
    } catch (err) {
      return res.status(500).send({ status: 500, message: err.message });
    }
  };

  static DeleteCourse = async (req, res) => {
    try {
      const id = req.params.id;

      const result = await CourseModel.DeleteCourse(id);

      if (result.affectedRows != 0) {
        return res.status(200).send({
          status: 200,
          message: "Course has been deleted successfully",
        });
      }

      return res.status(404).send({
        status: 404,
        message: "Couldn't find a course with this id.",
      });
    } catch (err) {
      return res.status(500).send({ status: 500, message: err.message });
    }
  };

  static AddCourse = async (req, res) => {
    try {
      const course = req.body;

      const result = await CourseModel.AddCourse(course);

      if (result.affectedRows != 0) {
        return res
          .status(200)
          .send({ status: 200, message: "Coures has been added successfully" });
      }

      return res
        .status(400)
        .send({ status: 400, message: "Failed to add course" });
    } catch (err) {
      return res.status(500).send({ status: 500, message: err.message });
    }
  };

  static EditCourse = async (req, res) => {
    try {
      const id = req.params.id;
      const course = req.body;

      const result = await CourseModel.EditCourse(id, course);

      if (result.affectedRows != 0) {
        return res
          .status(200)
          .send({
            status: 200,
            message: "Course has been edited successfully",
          });
      }
      
      return res
        .status(400)
        .send({ status: 400, message: "Failed to edit course" });
    } catch (err) {
      return res.status(500).send({ status: 500, message: err.message });
    }
  };
}

module.exports = CourseController;
