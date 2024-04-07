require("dotenv").config({ path: `${process.cwd()}/.env` });

const express = require("express");
const mainRouter = require("./core/Router");

const app = express();


app.use(express.json());


app.use("/api/v1", mainRouter);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is Running On Port: ${PORT}`);
});
