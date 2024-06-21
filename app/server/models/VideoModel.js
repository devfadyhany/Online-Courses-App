import { executeQuery, Add } from "../core/Model.js";

const table = "video";

// const video = {
// video_src,
// title,
// description,
// duration,
// course_id,
// };

export const AddVideo = async (video) => {
  return await Add(table, video);
};

export const GetCourseVideos = async (course_id) => {
  return await executeQuery(
    `select * from ${table} where course_id = ?`,
    course_id
  );
};

export const GetVideo = async (video_src) => {
  return await executeQuery(
    `select * from ${table} where video_src = ?`,
    video_src
  );
};

export const DeleteVideo = async (video_src) => {
  return await executeQuery(
    `delete from ${table} where video_src = ?`,
    video_src
  );
};

export const EditVideo = async (video, video_src) => {
  const MappedArray = Object.keys(video).map((el) => {
    return el + " = ? ";
  });

  const query = `UPDATE ${table} SET ${MappedArray} where video_src = ?`;

  const params = [...Object.values(video), video_src];
  return await executeQuery(query, params);
};
