import {
  Enroll,
  Expel,
  GetAllEnrolls,
  GetEnrollsByUserId,
} from "../models/EnrollModel.js";

export const GetEnrolls = async (req, res) => {
  try {
    const data = await GetAllEnrolls();

    if (data.length != 0) {
      return res.status(200).send({ status: 200, data: data });
    }

    return res
      .status(404)
      .send({ status: 404, message: "No Enrolls have been found." });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};

export const GetUserEnrolls = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const data = await GetEnrollsByUserId(user_id);

    if (data.length != 0) {
      return res.status(200).send({ status: 200, data: data[0] });
    }

    return res
      .status(404)
      .send({ status: 404, message: "Couldn't find Enrolls for this user." });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};

export const DeleteEnroll = async (req, res) => {
  try {
    const { user_id, course_id } = req.body;

    const result = await Expel(user_id, course_id);

    if (result.affectedRows != 0) {
      return res
        .status(200)
        .send({ status: 200, message: "Enroll Deleted Successfully" });
    }

    return res.status(404).send({
      status: 404,
      message: "Couldn't find an Enroll with this id.",
    });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};

export const EnrollUser = async (req, res) => {
  try {
    const { user_id, course_id } = req.body;

    const result = await Enroll(user_id, course_id);

    if (result.affectedRows != 0) {
      return res.status(200).send({
        status: 200,
        message: "User has been enrolled to this course successfully",
      });
    }

    return res
      .status(400)
      .send({ status: 400, message: "Failed to enroll user" });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};
