const Model = require("../core/Model");

const table = "course";

// const course = {
// title,
// image,
// description,
// price,
// length,
// level,
// publishDate,
// user_id,
// };

class CourseModel extends Model {
  static GetCourses = async () => {
    return await GetAll(table);
  };

  static GetCourse = async (id) => {
    return await GetSingle(table, "id", id);
  };

  static DeleteCourse = async (id) => {
    return await Delete(table, id);
  };

  static AddCourse = async (course) => {
    return await Add(table, course);
  };

  static EditCourse = async (id, course) => {
    return await Edit(table, id, course);
  };
}

module.exports = CourseModel;
