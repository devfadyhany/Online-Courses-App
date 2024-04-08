const CommentModel = require("../models/CommentModel");

class CommentController {
  static GetComments = async (req, res) => {
    try {
      const course_id = req.body.course_id;
      const video_title = req.body.video_title;

      const data = await CommentModel.GetComments(course_id, video_title);

      if (data.length != 0) {
        return res.status(200).send({ status: 200, data: data });
      }
      return res
        .status(404)
        .send({ status: 404, message: "No comments have been found." });
    } catch (err) {
      return res.status(500).send({ status: 500, message: err.message });
    }
  };

  static GetCommentById = async (req, res) => {
    try {
      const id = req.params.id;

      const data = await CommentModel.GetCommentById(id);

      if (data.length != 0) {
        return res.status(200).send({ status: 200, data: data[0] });
      }

      return res.status(404).send({
        status: 404,
        message: "Couldn't find a comment with this id.",
      });
    } catch (err) {
      return res.status(500).send({ status: 500, message: err.message });
    }
  };

  static DeleteComment = async (req, res) => {
    try {
      const id = req.params.id;

      const result = await CommentModel.DeleteComment(id);

      if (result.affectedRows != 0) {
        return res.status(200).send({
          status: 200,
          message: "Comment has been deleted successfully",
        });
      }

      return res.status(404).send({
        status: 404,
        message: "Couldn't find a comment with this id.",
      });
    } catch (err) {
      return res.status(500).send({ status: 500, message: err.message });
    }
  };

  static AddComment = async (req, res) => {
    try {
      const Comment = req.body;

      const result = await CommentModel.AddComment(Comment);

      if (result.affectedRows != 0) {
        return res.status(200).send({
          status: 200,
          message: "Comment has been added successfully",
        });
      }

      return res
        .status(400)
        .send({ status: 400, message: "Failed to add Comment" });
    } catch (err) {
      return res.status(500).send({ status: 500, message: err.message });
    }
  };

  static EditComment = async (req, res) => {
    try {
      const id = req.params.id;
      const Comment = req.body;

      const result = await CommentModel.EditComment(id, Comment);

      if (result.affectedRows != 0) {
        return res
          .status(200)
          .send({
            status: 200,
            message: "Comment has been edited successfully",
          });
      }
      
      return res
        .status(400)
        .send({ status: 400, message: "Failed to edit Comment" });
    } catch (err) {
      return res.status(500).send({ status: 500, message: err.message });
    }
  };
}

module.exports = CommentController;
