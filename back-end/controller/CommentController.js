const CommentModel = require("../models/CommentModel");

class CommentController {
  static GetComments = async (req, res) => {
    const course_id = req.body.course_id;
    const video_title = req.body.video_title;

    const data = await CommentModel.GetComments(course_id, video_title);

    if (data.length != 0) {
      res.status(200).send({ status: 200, data: data });
    } else {
      res
        .status(404)
        .send({ status: 404, message: "No comments have been found." });
    }
  };

  static GetCommentById = async (req, res) => {
    const id = req.params.id;

    const data = await CommentModel.GetCommentById(id);

    if (data.length != 0) {
      res.status(200).send({ status: 200, data: data[0] });
    } else {
      res.status(404).send({
        status: 404,
        message: "Couldn't find a comment with this id.",
      });
    }
  };

  static DeleteComment = async (req, res) => {
    const id = req.params.id;

    const result = await CommentModel.DeleteComment(id);

    if (result.affectedRows != 0) {
      res
        .status(200)
        .send({
          status: 200,
          message: "Comment has been deleted successfully",
        });
    } else {
      res.status(404).send({
        status: 404,
        message: "Couldn't find a comment with this id.",
      });
    }
  };

  static AddComment = async (req, res) => {
    const Comment = {
      user_id: req.body.user_id,
      course_id: req.body.course_id,
      video_title: req.body.video_title,
      message: req.body.message,
    };

    const result = await CommentModel.AddComment(Comment);

    if (result.affectedRows != 0) {
      res
        .status(200)
        .send({ status: 200, message: "Comment has been added successfully" });
    } else {
      res.status(400).send({ status: 400, message: "Failed to add Comment" });
    }
  };

  static EditComment = async (req, res) => {
    const id = req.params.id;

    const Comment = {
      user_id: req.body.user_id,
      course_id: req.body.course_id,
      video_title: req.body.video_title,
      message: req.body.message,
    };

    const result = await CommentModel.EditComment(id, Comment);

    if (result.affectedRows != 0) {
      res
        .status(200)
        .send({ status: 200, message: "Comment has been edited successfully" });
    } else {
      res.status(400).send({ status: 400, message: "Failed to edit Comment" });
    }
  };
}

module.exports = CommentController;
