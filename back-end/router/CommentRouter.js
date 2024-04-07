const commentRouter = require("express").Router();
const CommentController = require("../controller/CommentController");

commentRouter.route("/").get(CommentController.GetComments).post(CommentController.AddComment);
commentRouter
  .route("/:id")
  .get(CommentController.GetCommentById)
  .delete(CommentController.DeleteComment)
  .put(CommentController.EditComment);

module.exports = commentRouter;
