import {
  GetCourseVideos,
  GetVideo,
  DeleteVideo,
  AddVideo,
  EditVideo,
} from "../models/VideoModel.js";

export const GetVideos = async (req, res) => {
  const course_id = req.params.course_id;

  try {
    const data = await GetCourseVideos(course_id);

    if (data.length != 0) {
      res.status(200).send({ status: 200, data: data });
    } else {
      res
        .status(404)
        .send({ status: 404, message: "No videos in this course yet." });
    }
  } catch (err) {
    return console.log(err.message);
  }
};

export const GetVideoInfo = async (req, res) => {
  const video_src = req.params.video_src;

  try {
    const data = await GetVideo(video_src);

    if (data.length != 0) {
      res.status(200).send({ status: 200, data: data[0] });
    } else {
      res.status(404).send({
        status: 404,
        message: "Couldn't find a Video with this source.",
      });
    }
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};

export const DeleteExistingVideo = async (req, res) => {
  const video_src = req.params.video_src;

  try {
    const result = await DeleteVideo(video_src);

    if (result.affectedRows != 0) {
      res
        .status(200)
        .send({ status: 200, message: "Video Deleted Successfully" });
    } else {
      res.status(404).send({
        status: 404,
        message: "Couldn't find a Video with this source.",
      });
    }
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};

export const AddNewVideo = async (req, res) => {
  const Video = req.body;

  try {
    const result = await AddVideo(Video);

    if (result.affectedRows != 0) {
      res
        .status(200)
        .send({ status: 200, message: "Video has been added successfully" });
    } else {
      res.status(400).send({ status: 400, message: "Failed to add video" });
    }
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};

export const EditVideoDetails = async (req, res) => {
  const video_src = req.params.video_src;

  const Video = req.body;

  try {
    const result = await EditVideo(Video, video_src);

    if (result.affectedRows != 0) {
      res
        .status(200)
        .send({ status: 200, message: "Video has been edited successfully" });
    } else {
      res.status(400).send({ status: 400, message: "Failed to edit video" });
    }
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};
