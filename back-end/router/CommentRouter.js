import express from "express";
import {
  GetComments,
  AddComment,
  GetComment,
  DeleteComment,
  EditComment,
} from "../controller/CommentController.js";

const commentRouter = express.Router();

commentRouter.route("/").get(GetComments).post(AddComment);
commentRouter
  .route("/:id")
  .get(GetComment)
  .delete(DeleteComment)
  .put(EditComment);

export default commentRouter;
