import express from "express";
import userRouter from "../router/UserRouter.js";
import courseRouter from "../router/CourseRouter.js";
import enrollRouter from "../router/EnrollRouter.js";
import videoRouter from "../router/VideoRouter.js";

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/course", courseRouter);
mainRouter.use("/enroll", enrollRouter);
mainRouter.use("/video", videoRouter);

export default mainRouter;