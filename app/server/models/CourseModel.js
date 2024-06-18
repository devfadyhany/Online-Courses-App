import {
  GetAll,
  GetSingle,
  Delete,
  Add,
  Edit,
  executeQuery,
} from "../core/Model.js";

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

export const GetAllCourses = async () => {
  return await GetAll(table);
};

export const SearchCourses = async (title, level, price) => {
  if (title) {
    return await executeQuery(
      `select * from ${table} where title LIKE ?`,
      '%'+title+'%'
    );
  }

  if (level) {
    return await executeQuery(`select * from ${table} where level = ?`, level);
  }

  if (price) {
    return await executeQuery(`select * from ${table} where price <= ?`, price);
  }
};

export const GetInstructorCourses = async (userId) => {
  return await executeQuery(`select * from ${table} where userId = ?`, userId);
};

export const GetCourseById = async (id) => {
  return await GetSingle(table, "id", id);
};

export const DeleteCourseById = async (id) => {
  return await Delete(table, id);
};

export const AddNewCourse = async (course) => {
  return await Add(table, course);
};

export const EditCourseById = async (id, course) => {
  return await Edit(table, id, course);
};
