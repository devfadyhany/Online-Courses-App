import express from "express";
import userRouter from "../router/UserRouter.js";
import courseRouter from "../router/CourseRouter.js";
import adminRouter from "../router/AdminRouter.js";
import commentRouter from "../router/CommentRouter.js";
import enrollRouter from "../router/EnrollRouter.js";
// import videoRouter from "../router/VideoRouter";

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/course", courseRouter);
mainRouter.use("/admin", adminRouter);
mainRouter.use("/comment", commentRouter);
mainRouter.use("/enroll", enrollRouter);
// mainRouter.use("/video", videoRouter);

export default mainRouter;