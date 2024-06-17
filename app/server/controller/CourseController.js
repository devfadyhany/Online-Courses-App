import {
  AddNewCourse,
  DeleteCourseById,
  EditCourseById,
  GetAllCourses,
  GetCourseById,
  GetInstructorCourses,
} from "../models/CourseModel.js";

export const GetCourses = async (req, res) => {
  try {
    const data = await GetAllCourses();

    if (data.length !== 0) {
      return res.status(200).send({ status: 200, data: data });
    }

    return res
      .status(404)
      .send({ status: 404, message: "No courses have been found." });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};

export const InstructorCourses = async (req, res) => {
  const userId = req.params.userId;
  try {
    const data = await GetInstructorCourses(userId);

    if (data.length !== 0) {
      return res.status(200).send({ status: 200, data: data });
    }

    return res
      .status(404)
      .send({ status: 404, message: "No courses have been found." });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};

export const GetCourse = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await GetCourseById(id);

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

export const DeleteCourse = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await DeleteCourseById(id);

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

export const AddCourse = async (req, res) => {
  try {
    const course = req.body;

    let today = new Date();
    let dd = String(today.getDate() + 1).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + "/" + mm + "/" + dd;

    course.publishDate = today;

    const result = await AddNewCourse(course);

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

export const EditCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const course = req.body;

    const result = await EditCourseById(id, course);

    if (result.affectedRows != 0) {
      return res.status(200).send({
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
