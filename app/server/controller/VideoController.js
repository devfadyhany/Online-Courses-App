// const VideoModel = require("../models/VideoModel");

// class VideoController {
//   static GetCourseVideos = async (req, res) => {
//     const course_id = req.params.course_id;

//     const data = await VideoModel.GetCourseVideos(course_id);

//     if (data.length != 0) {
//       res.status(200).send({ status: 200, data: data });
//     } else {
//       res
//         .status(404)
//         .send({ status: 404, message: "No videos in this course yet." });
//     }
//   };

//   static GetVideo = async (req, res) => {
//     const video_src = req.body.video_src;

//     const data = await VideoModel.GetVideo(video_src);

//     if (data.length != 0) {
//       res.status(200).send({ status: 200, data: data[0] });
//     } else {
//       res.status(404).send({
//         status: 404,
//         message: "Couldn't find a Video with this source.",
//       });
//     }
//   };

//   static DeleteVideo = async (req, res) => {
//     const video_src = req.body.video_src;

//     const result = await VideoModel.DeleteVideo(video_src);

//     if (result.affectedRows != 0) {
//       res
//         .status(200)
//         .send({ status: 200, message: "Video Deleted Successfully" });
//     } else {
//       res.status(404).send({
//         status: 404,
//         message: "Couldn't find a Video with this source.",
//       });
//     }
//   };

//   static UploadVideo = async (req, res) => {
//     const Video = {
//       video_src: req.body.video_src,
//       title: req.body.title,
//       description: req.body.description,
//       duration: req.body.duration,
//       course_id: req.body.course_id,
//     };

//     const result = await VideoModel.UploadVideo(Video);

//     if (result.affectedRows != 0) {
//       res
//         .status(200)
//         .send({ status: 200, message: "Video has been added successfully" });
//     } else {
//       res.status(400).send({ status: 400, message: "Failed to add video" });
//     }
//   };

//   static EditVideo = async (req, res) => {
//     const video_src = req.params.video_src;

//     const Video = {
//       title: req.body.title,
//       description: req.body.description,
//       duration: req.body.duration,
//     };

//     const result = await VideoModel.EditVideo(Video, video_src);

//     if (result.affectedRows != 0) {
//       res
//         .status(200)
//         .send({ status: 200, message: "Video has been edited successfully" });
//     } else {
//       res.status(400).send({ status: 400, message: "Failed to edit video" });
//     }
//   };
// }

// module.exports = VideoController;
