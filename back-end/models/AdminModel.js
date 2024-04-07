const { GetAll, GetById, Delete, Add, Edit } = require("../core/Model");

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

  static GetAdminById = async (id) => {
    return await GetById(table, id);
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

  static Login = async (email, password) => {
    return await executeQuery(`select * from ${table} where email = ? and password = ?`, [email, password]);
  }
}

module.exports = AdminModel;
