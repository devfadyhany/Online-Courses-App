import express from "express";
import {GetAdmins, AddAdmin, DeleteAdmin, EditAdmin, Login} from "../controller/AdminController.js";

const adminRouter = express.Router();

adminRouter.route("/").get(GetAdmins).post(AddAdmin);
adminRouter.route("/:id").delete(DeleteAdmin).put(EditAdmin);
adminRouter.get("/login", Login);

export default adminRouter;