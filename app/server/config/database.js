import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};

const db = mysql.createPool(connection);

db.getConnection((err) => {
  if (!err) {
    console.log("database started successfully");
  }
});

export default db;