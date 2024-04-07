const enrollRouter = require("express").Router();
const EnrollController = require("../controller/EnrollController");

enrollRouter
  .route("/")
  .get(EnrollController.GetEnrolls)
  .post(EnrollController.EnrollUser)
  .delete(EnrollController.DeleteEnroll);

enrollRouter.get("/:user_id", EnrollController.GetUserEnrolls);

module.exports = enrollRouter;
