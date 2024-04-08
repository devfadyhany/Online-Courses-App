const adminRouter = require("express").Router();
const AdminController = require("../controller/AdminController");

adminRouter
  .route("/")
  .get(AdminController.GetAdmins)
  .post(AdminController.AddAdmin);
  
adminRouter
  .route("/:id")
  .delete(AdminController.DeleteAdmin)
  .put(AdminController.EditAdmin);

adminRouter.get("/login", AdminController.Login);

module.exports = adminRouter;
