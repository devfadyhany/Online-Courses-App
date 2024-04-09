const { GetAll, GetSingle, Delete, Add, Edit } = require("../core/Model");

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

  static GetUser = async (email) => {
    return await GetSingle(table, "email", email);
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
}

module.exports = UserModel;
