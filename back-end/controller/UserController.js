const UserModel = require("../models/UserModel");

class UserController {
  static GetUsers = async (req, res) => {
    const data = await UserModel.GetUsers();

    if (data.length != 0) {
      res.status(200).send({ status: 200, data: data });
    } else {
      res
        .status(404)
        .send({ status: 404, message: "No users have been found." });
    }
  };

  static GetUserById = async (req, res) => {
    const id = req.params.id;

    const data = await UserModel.GetUserById(id);

    if (data.length != 0) {
      res.status(200).send({ status: 200, data: data[0] });
    } else {
      res
        .status(404)
        .send({ status: 404, message: "Couldn't find a user with this id." });
    }
  };

  static DeleteUser = async (req, res) => {
    const id = req.params.id;

    const result = await UserModel.DeleteUser(id);

    if (result.affectedRows != 0) {
      res
        .status(200)
        .send({ status: 200, message: "User Deleted Successfully" });
    } else {
      res
        .status(404)
        .send({ status: 404, message: "Couldn't find a user with this id." });
    }
  };

  static AddUser = async (req, res) => {
    const user = {
      image: req.body.image,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      isInstructor: req.body.isInstructor,
    };

    const result = await UserModel.AddUser(user);

    if (result.affectedRows != 0) {
      res
        .status(200)
        .send({ status: 200, message: "User has been added successfully" });
    } else {
      res.status(400).send({ status: 400, message: "Failed to add user" });
    }
  };

  static EditUser = async (req, res) => {
    const id = req.params.id;

    const user = {
      image: req.body.image,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      isInstructor: req.body.isInstructor,
    };

    const result = await UserModel.EditUser(id, user);

    if (result.affectedRows != 0) {
      res
        .status(200)
        .send({ status: 200, message: "User has been edited successfully" });
    } else {
      res.status(400).send({ status: 400, message: "Failed to edit user" });
    }
  };

  static Login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const result = await UserModel.Login(email, password);

    if (result.length != 0) {
      res.status(200).send({ status: 200, data: data });
    } else {
      res.status(404).send({
        status: 404,
        message:
          "Failed to login: Email or password is wrong, please try again !",
      });
    }
  };
}

module.exports = UserController;
