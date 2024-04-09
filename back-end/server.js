import dotenv from "dotenv";
import express from "express";
import mainRouter from "./core/Router.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", mainRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is Running On Port: ${PORT}`);
});
