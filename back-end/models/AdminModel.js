import { GetAll, GetSingle, Delete, Add, Edit } from "../core/Model.js";

const table = "admin";

// const admin = {
//   id,
//   name,
//   email,
//   password,
//   gender,
// };

export const GetAllAdmins = async () => {
  return await GetAll(table);
};

export const GetAdminByEmail = async (email) => {
  return await GetSingle(table, "email", email);
};

export const DeleteAdminById = async (id) => {
  return await Delete(table, id);
};

export const AddNewAdmin = async (admin) => {
  return await Add(table, admin);
};

export const EditAdminById = async (id, admin) => {
  return await Edit(table, id, admin);
};
