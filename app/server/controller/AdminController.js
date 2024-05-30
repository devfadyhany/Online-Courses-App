import {AddNewAdmin, DeleteAdminById, EditAdminById, GetAdminByEmail, GetAllAdmins} from "../models/AdminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const GetAdmins = async (req, res) => {
  try {
    const data = await GetAllAdmins();

    if (data.length != 0) {
      return res.status(200).send({ status: 200, data: data });
    }

    return res
      .status(404)
      .send({ status: 404, message: "No Admins have been found." });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};

export const AddAdmin = async (req, res) => {
  try {
    const admin = req.body;

    admin.password = await bcrypt.hash(admin.password, 10);

    const result = await AddNewAdmin(admin);

    if (result.affectedRows != 0) {
      return res
        .status(200)
        .send({ status: 200, message: "Admin has been added successfully" });
    }

    return res
      .status(400)
      .send({ status: 400, message: "Failed to add admin" });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};

export const DeleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await DeleteAdminById(id);

    if (result.affectedRows != 0) {
      return res
        .status(200)
        .send({ status: 200, message: "Admin Deleted Successfully" });
    }
    return res
      .status(404)
      .send({ status: 404, message: "Couldn't find a Admin with this id." });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};

export const EditAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const Admin = req.body;

    const result = await EditAdminById(id, Admin);

    if (result.affectedRows != 0) {
      return res
        .status(200)
        .send({ status: 200, message: "Admin has been edited successfully" });
    }

    return res
      .status(400)
      .send({ status: 400, message: "Failed to edit Admin" });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findAdmin = await GetAdminByEmail(email);

    if (findAdmin[0]) {
      const passwordMatch = await bcrypt.compare(
        password,
        findAdmin[0].password
      );

      if (passwordMatch) {
        delete findAdmin[0].password;

        const token = jwt.sign(findAdmin[0], process.env.API_KEY, {
          expiresIn: "1h",
        });

        res.cookie("token", token, {
          httpOnly: true,
        });

        return res.status(200).send({
          status: 200,
          message: "Logged in successfully!",
        });
      }
    }

    return res.status(404).send({
      status: 404,
      message:
        "Failed to login: Email or password is wrong, please try again !",
    });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};
