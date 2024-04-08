const Model = require("../core/Model");

const table = "comment";

// const comment = {
//   user_id,
//   course_id,
//   video_title,
//   message,
// };

class AdminModel extends Model{
  static GetComments = async (course_id, video_title) => {
    const query = `SELECT * FROM ${table} WHERE course_id = ? AND video_title = ?`;
    return await executeQuery(query, [course_id, video_title]);
  };

  static GetCommentById = async (id) => {
    return await GetSingle(table, "id", id);
  };

  static DeleteComment = async (id) => {
    return await Delete(table, id);
  };

  static AddComment = async (comment) => {
    return await Add(table, comment);
  };

  static EditAdmin = async (id, comment) => {
    return await Edit(table, id, comment);
  };
}

module.exports = AdminModel;
