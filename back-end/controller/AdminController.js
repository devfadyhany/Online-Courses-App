const AdminModel = require("../models/AdminModel");

class AdminController {
  static GetAdmins = async (req, res) => {
    const data = await AdminModel.GetAdmins();

    if (data.length != 0) {
      res.status(200).send({ status: 200, data: data });
    } else {
      res
        .status(404)
        .send({ status: 404, message: "No Admins have been found." });
    }
  };

  static GetAdminById = async (req, res) => {
    const id = req.params.id;

    const data = await AdminModel.GetAdminById(id);

    if (data.length != 0) {
      res.status(200).send({ status: 200, data: data[0] });
    } else {
      res
        .status(404)
        .send({ status: 404, message: "Couldn't find a Admin with this id." });
    }
  };

  static DeleteAdmin = async (req, res) => {
    const id = req.params.id;

    const result = await AdminModel.DeleteAdmin(id);

    if (result.affectedRows != 0) {
      res
        .status(200)
        .send({ status: 200, message: "Admin Deleted Successfully" });
    } else {
      res
        .status(404)
        .send({ status: 404, message: "Couldn't find a Admin with this id." });
    }
  };

  static AddAdmin = async (req, res) => {
    const Admin = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
    };

    const result = await AdminModel.AddAdmin(Admin);

    if (result.affectedRows != 0) {
      res
        .status(200)
        .send({ status: 200, message: "Admin has been added successfully" });
    } else {
      res.status(400).send({ status: 400, message: "Failed to add Admin" });
    }
  };

  static EditAdmin = async (req, res) => {
    const id = req.params.id;

    const Admin = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
    };

    const result = await AdminModel.EditAdmin(id, Admin);

    if (result.affectedRows != 0) {
      res
        .status(200)
        .send({ status: 200, message: "Admin has been edited successfully" });
    } else {
      res.status(400).send({ status: 400, message: "Failed to edit Admin" });
    }
  };

  static Login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const result = await AdminModel.Login(email, password);

    if (result.length != 0) {
      res.status(200).send({ status: 200, data: data });
    } else {
      res
        .status(404)
        .send({
          status: 404,
          message: "Failed to login: Email or password is wrong, please try again !",
        });
    }
  };
}

module.exports = AdminController;
