const Model = require("../core/Model");

const table = "enroll";

// const enroll = {
// user_id,
// course_id,
// enrollmentDate,
// };

class EnrollModel extends Model{
  static GetEnrolls = async () => {
    return await GetAll(table);
  };

  static GetUserEnrolls = async (user_id) => {
    return await GetSingle(table, "user_id", user_id);
  };

  static DeleteEnroll = async (user_id, course_id) => {
    return await executeQuery(
      `delete from ${table} where user_id = ? and course_id = ?`,
      [user_id, course_id]
    );
  };

  static EnrollUser = async (user_id, course_id) => {
    return await executeQuery(
      `insert into ${table} ('user_id', 'course_id', 'enrollmentDate') values (?,?,CURDATE())`,
      [user_id, course_id]
    );
  };
}

module.exports = EnrollModel;
