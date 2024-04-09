const {
  executeQuery,
  GetAll,
  GetSingle,
  Delete,
  Add,
  Edit,
} = require("../core/Model");

const table = "admin";

// const admin = {
//   id,
//   name,
//   email,
//   password,
//   gender,
// };

class AdminModel {
  static GetAdmins = async () => {
    return await GetAll(table);
  };

  static GetAdmin = async (email) => {
    return await GetSingle(table, "email", email);
  };

  static DeleteAdmin = async (id) => {
    return await Delete(table, id);
  };

  static AddAdmin = async (admin) => {
    return await Add(table, admin);
  };

  static EditAdmin = async (id, admin) => {
    return await Edit(table, id, admin);
  };
}

module.exports = AdminModel;
