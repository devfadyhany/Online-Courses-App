const EnrollModel = require("../models/EnrollModel");

class EnrollController {
  static GetEnrolls = async (req, res) => {
    const data = await EnrollModel.GetEnrolls();

    if (data.length != 0) {
      res.status(200).send({ status: 200, data: data });
    } else {
      res
        .status(404)
        .send({ status: 404, message: "No Enrolls have been found." });
    }
  };

  static GetUserEnrolls = async (req, res) => {
    const user_id = req.params.user_id;

    const data = await EnrollModel.GetUserEnrolls(user_id);

    if (data.length != 0) {
      res.status(200).send({ status: 200, data: data[0] });
    } else {
      res
        .status(404)
        .send({ status: 404, message: "Couldn't find Enrolls for this user." });
    }
  };

  static DeleteEnroll = async (req, res) => {
    const user_id = req.body.user_id;
    const course_id = req.body.course_id;

    const result = await EnrollModel.DeleteEnroll(user_id, course_id);

    if (result.affectedRows != 0) {
      res
        .status(200)
        .send({ status: 200, message: "Enroll Deleted Successfully" });
    } else {
      res
        .status(404)
        .send({ status: 404, message: "Couldn't find an Enroll with this id." });
    }
  };

  static EnrollUser = async (req, res) => {
    const user_id = req.body.user_id;
    const course_id = req.body.course_id;

    const result = await EnrollModel.EnrollUser(user_id, course_id);

    if (result.affectedRows != 0) {
      res
        .status(200)
        .send({ status: 200, message: "User has been enrolled to this course successfully" });
    } else {
      res.status(400).send({ status: 400, message: "Failed to enroll user" });
    }
  };
}

module.exports = EnrollController;
