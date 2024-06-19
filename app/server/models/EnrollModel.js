import { executeQuery, GetAll, GetSingle } from "../core/Model.js";

const table = "enroll";

// const enroll = {
// user_id,
// course_id,
// enrollmentDate,
// };

export const GetAllEnrolls = async () => {
  return await GetAll(table);
};

export const GetEnrollsByUserId = async (user_id) => {
  return await executeQuery(`select * from ${table} where user_id = ?`, user_id);
};

export const Expel = async (user_id, course_id) => {
  return await executeQuery(
    `delete from ${table} where user_id = ? and course_id = ?`,
    [user_id, course_id]
  );
};

export const Enroll = async (user_id, course_id) => {
  return await executeQuery(
    `insert into ${table} (user_id, course_id, enrollmentDate) values (?,?,CURDATE())`,
    [user_id, course_id]
  );
};
