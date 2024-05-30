import { GetAll, GetSingle, Delete, Add, Edit } from "../core/Model.js";

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

export const GetAllUsers = async () => {
  return await GetAll(table);
};

export const GetUserByEmail = async (email) => {
  return await GetSingle(table, "email", email);
};

export const DeleteUserById = async (id) => {
  return await Delete(table, id);
};

export const AddNewUser = async (user) => {
  return await Add(table, user);
};

export const EditUserById = async (id, user) => {
  return await Edit(table, id, user);
};
