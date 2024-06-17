import {
  AddNewUser,
  DeleteUserById,
  EditUserById,
  GetAllUsers,
  GetSingleUser,
  GetUserByEmail,
} from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const GetUsers = async (req, res) => {
  try {
    const data = await GetAllUsers();

    if (data.length != 0) {
      return res.status(200).send({ status: 200, data: data });
    }

    return res
      .status(404)
      .send({ status: 404, message: "No users have been found." });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};

export const GetUser = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await GetSingleUser(id);
    data[0].password = "";

    if (data.length != 0) {
      return res.status(200).send({ status: 200, data: data[0] });
    }

    return res
      .status(404)
      .send({ status: 404, message: "No user for this id." });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await DeleteUserById(id);

    if (result.affectedRows !== 0) {
      return res
        .status(200)
        .send({ status: 200, message: "User Deleted Successfully" });
    }

    return res
      .status(404)
      .send({ status: 404, message: "Couldn't find a user with this id." });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};

export const EditUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;

    const result = await EditUserById(id, user);

    if (result.affectedRows !== 0) {
      return res
        .status(200)
        .send({ status: 200, message: "User has been edited successfully" });
    }

    return res
      .status(400)
      .send({ status: 400, message: "Failed to edit user" });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await GetUserByEmail(email);

    if (findUser[0]) {
      const passwordMatch = await bcrypt.compare(
        password,
        findUser[0].password
      );

      if (passwordMatch) {
        delete findUser[0].password;

        const token = jwt.sign(findUser[0], process.env.API_KEY, {
          expiresIn: "1d",
        });

        res.cookie("token", token, {
          httpOnly: true,
        });

        return res.status(200).send({
          status: 200,
          message: "Logged in successfully!",
          token: token,
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

export const Register = async (req, res) => {
  try {
    const user = req.body;

    if (!user.isInstructor) {
      user.isInstructor = "N";
    }

    const findUser = await GetUserByEmail(user.email);

    if (findUser.length !== 0) {
      return res.status(400).send({
        status: 400,
        message:
          "Failed to Register: User already exists, try again with diffrent account!",
      });
    }

    user.password = await bcrypt.hash(user.password, 10);

    const result = AddNewUser(user);

    if (result.affectedRows !== 0) {
      delete user.password;

      const token = jwt.sign(user, process.env.API_KEY, {
        expiresIn: "1d",
      });

      return res.status(200).send({
        status: 200,
        message: "User Has Been Registered Successfully!",
        token: token,
      });
    }

    return res.status(400).send({ status: 400, message: "Failed to register!" });
  } catch (err) {
    return res.status(500).send({ status: 500, message: err.message });
  }
};
