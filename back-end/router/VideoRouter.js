const videoRouter = require("express").Router();
const VideoController = require("../controller/VideoController");

videoRouter
  .route("/")
  .get(VideoController.GetVideo)
  .post(VideoController.UploadVideo)
  .delete(VideoController.DeleteVideo);

videoRouter.get("/:course_id", VideoController.GetCourseVideos);
videoRouter.put("/:video_src", VideoController.EditVideo);

module.exports = videoRouter;
