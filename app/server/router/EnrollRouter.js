import express from "express";
import {
  GetEnrolls,
  EnrollUser,
  DeleteEnroll,
  GetUserEnrolls,
} from "../controller/EnrollController.js";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const stripe = Stripe(process.env.stripe_secret_key);
const enrollRouter = express.Router();

enrollRouter.route("/").get(GetEnrolls).delete(DeleteEnroll);
enrollRouter.post("/", async (req, res) => {
  try {
    const course = req.body.course;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.title,
            },
            unit_amount: course.price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/payment/success?user_id=${req.body.user_id}&course_id=${course.id}`,
      cancel_url: "http://localhost:3000/payment/cancel",
    });
    res.send({ url: session.url });
  } catch (err) {
    console.log(err);
  }
});

enrollRouter.post("/StoreEnroll", EnrollUser);
enrollRouter.get("/:user_id", GetUserEnrolls);

export default enrollRouter;
