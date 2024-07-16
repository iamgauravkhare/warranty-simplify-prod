import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DBURL =
  process.env.ENVIRONMENT == "true"
    ? process.env.DB_URL
    : process.env.REMOTE_DB_URL;

export const databaseConnection = () => {
  mongoose.connect(DBURL).then(() => {
    console.log("Connected to database!");
  });
};
