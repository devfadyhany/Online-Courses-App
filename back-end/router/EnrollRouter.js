import express from "express";
import {GetEnrolls, EnrollUser, DeleteEnroll, GetUserEnrolls} from "../controller/EnrollController.js";

const enrollRouter = express.Router();

enrollRouter.route("/").get(GetEnrolls).post(EnrollUser).delete(DeleteEnroll);
enrollRouter.get("/:user_id", GetUserEnrolls);

export default enrollRouter;
