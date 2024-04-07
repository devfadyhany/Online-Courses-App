const mainRouter = require("express").Router();

const userRouter = require("../router/UserRouter");
const courseRouter = require("../router/CourseRouter");
const adminRouter = require("../router/AdminRouter");
const commentRouter = require("../router/CommentRouter");
const enrollRouter = require("../router/EnrollRouter");
const videoRouter = require("../router/VideoRouter");


mainRouter.use("user", userRouter);
mainRouter.use("course", courseRouter);
mainRouter.use("admin", adminRouter);
mainRouter.use("comment", commentRouter);
mainRouter.use("enroll", enrollRouter);
mainRouter.use("video", videoRouter);


module.exports = mainRouter;
