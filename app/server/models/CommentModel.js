import { executeQuery, GetSingle, Delete, Add, Edit } from "../core/Model.js";

const table = "comment";

// const comment = {
//   id,
//   user_id,
//   course_id,
//   video_title,
//   message,
// };

export const GetAllComments = async (course_id, video_title) => {
  const query = `SELECT * FROM ${table} WHERE course_id = ? AND video_title = ?`;
  return await executeQuery(query, [course_id, video_title]);
};

export const GetCommentById = async (id) => {
  return await GetSingle(table, "id", id);
};

export const DeleteCommentById = async (id) => {
  return await Delete(table, id);
};

export const AddNewComment = async (comment) => {
  return await Add(table, comment);
};

export const EditCommentById = async (id, comment) => {
  return await Edit(table, id, comment);
};
