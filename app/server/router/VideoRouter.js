import express from "express";
import {
  EditVideoDetails,
  GetVideoInfo,
  AddNewVideo,
  DeleteExistingVideo,
  GetVideos,
} from "../controller/VideoController.js";
import { courseVideoUpload } from "../controller/Uploader.js";

const videoRouter = express.Router();

videoRouter.post("/", AddNewVideo);
videoRouter.get("/:course_id", GetVideos);
videoRouter
  .route("/source/:video_src")
  .get(GetVideoInfo)
  .put(EditVideoDetails)
  .delete(DeleteExistingVideo);

videoRouter.post("/upload", courseVideoUpload.single("video"), (req, res) => {
  res.send("Video Uploaded Successfully");
});

videoRouter.use("/sources", express.static("Videos"));

export default videoRouter;
