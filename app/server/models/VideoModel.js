// const { executeQuery, GetAll, Add, Edit } = require("../core/Model");

// const table = "video";

// // const video = {
// // video_src,
// // title,
// // description,
// // duration,
// // course_id,
// // };

// class EnrollModel {
//   static GetCourseVideos = async (course_id) => {
//     return await executeQuery(`select * from ${table} where course_id = ?`, [
//       course_id,
//     ]);
//   };

//   static GetVideo = async (video_src) => {
//     return await executeQuery(`select * from ${table} where video_src = ?`, [
//       video_src,
//     ]);
//   };

//   static DeleteVideo = async (video_src) => {
//     return await executeQuery(`delete from ${table} where video_src = ?`, [
//       video_src,
//     ]);
//   };

//   static UploadVideo = async (video) => {
//     return await Add(table, video);
//   };

//   static EditVideo = async (video, video_src) => {
//     const MappedArray = Object.keys(video).map((el) => {
//       return el + " = ? ";
//     });

//     const query = `UPDATE ${table} SET ${MappedArray} where video_src = ?`;

//     const params = [...Object.values(video), video_src];
//     return await executeQuery(query, params);
//   };
// }

// module.exports = EnrollModel;
