const CourseModel = require("../models/CourseModel");

class CourseController {
  static GetCourses = async (req, res) => {
    const data = await CourseModel.GetCourses();

    if (data.length != 0) {
      res.status(200).send({ status: 200, data: data });
    } else {
      res
        .status(404)
        .send({ status: 404, message: "No courses have been found." });
    }
  };

  static GetCourseById = async (req, res) => {
    const id = req.params.id;

    const data = await CourseModel.GetCourseById(id);

    if (data.length != 0) {
      res.status(200).send({ status: 200, data: data[0] });
    } else {
      res
        .status(404)
        .send({ status: 404, message: "Couldn't find a course with this id." });
    }
  };

  static DeleteCourse = async (req, res) => {
    const id = req.params.id;

    const result = await CourseModel.DeleteCourse(id);

    if (result.affectedRows != 0) {
      res
        .status(200)
        .send({ status: 200, message: "Course has been deleted successfully" });
    } else {
      res
        .status(404)
        .send({ status: 404, message: "Couldn't find a course with this id." });
    }
  };

  static AddCourse = async (req, res) => {
    const course = {
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
      length: req.body.length,
      level: req.body.level,
      publishDate: req.body.publishDate,
      user_id: req.body.user_id,
    };

    const result = await CourseModel.AddCourse(course);

    if (result.affectedRows != 0) {
      res
        .status(200)
        .send({ status: 200, message: "Coures has been added successfully" });
    } else {
      res.status(400).send({ status: 400, message: "Failed to add course" });
    }
  };

  static EditCourse = async (req, res) => {
    const id = req.params.id;

    const course = {
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
        length: req.body.length,
        level: req.body.level,
        publishDate: req.body.publishDate,
        user_id: req.body.user_id,
      };

    const result = await CourseModel.EditCourse(id, course);

    if (result.affectedRows != 0) {
      res
        .status(200)
        .send({ status: 200, message: "Course has been edited successfully" });
    } else {
      res.status(400).send({ status: 400, message: "Failed to edit course" });
    }
  };
}

module.exports = CourseController;
