const { GetAll, GetById, Delete, Add, Edit, executeQuery } = require("../core/Model");

const table = "user";

// const user = {
//   id,
//   image,
//   name,
//   email,
//   password,
//   gender,
//   isInstructor,
// };

class UserModel {
  static GetUsers = async () => {
    return await GetAll(table);
  };

  static GetUserById = async (id) => {
    return await GetById(table, id);
  };

  static DeleteUser = async (id) => {
    return await Delete(table, id);
  };

  static AddUser = async (user) => {
    return await Add(table, user);
  };

  static EditUser = async (id, user) => {
    return await Edit(table, id, user);
  };

  static Login = async (email, password) => {
    return await executeQuery(`select * from ${table} where email = ? and password = ?`, [email, password]);
  }
}

module.exports = UserModel;
