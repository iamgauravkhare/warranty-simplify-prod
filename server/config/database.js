import mongoose from "mongoose";

export const databaseConnection = () => {
  mongoose
    .connect(
      process.env.ENVIRONMENT ? process.env.DB_URL : process.env.REMOTE_DB_URL
    )
    .then(() => {
      console.log("Connected to database!");
    });
};
