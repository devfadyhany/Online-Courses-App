require("dotenv").config({ path: `${process.cwd()}/.env` });

const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static GetUsers = async (req, res) => {
    try {
      const data = await UserModel.GetUsers();

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

  static DeleteUser = async (req, res) => {
    try {
      const id = req.params.id;

      const result = await UserModel.DeleteUser(id);

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

  static EditUser = async (req, res) => {
    try {
      const id = req.params.id;
      const user = req.body;

      const result = await UserModel.EditUser(id, user);

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

  static Login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const findUser = await UserModel.GetUser(email);

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

  static Register = async (req, res) => {
    try {
      const user = req.body;

      const findUser = await UserModel.GetUser(user.email);

      if (findUser.length !== 0) {
        return res.status(400).send({
          status: 400,
          message:
            "Failed to Register: User already exists, try again with diffrent account!",
        });
      }

      user.password = await bcrypt.hash(user.password, 10);

      const result = UserModel.AddUser(user);

      if (result.affectedRows !== 0) {
        return res
          .status(200)
          .send({ status: 200, message: "User has registerd successfully!" });
      }

      return res
        .send(400)
        .send({ status: 400, message: "Failed to register!" });
    } catch (err) {
      return res.status(500).send({ status: 500, message: err.message });
    }
  };
}

module.exports = UserController;
