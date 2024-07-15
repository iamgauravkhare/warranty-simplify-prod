import mongoose from "mongoose";

export const databaseConnection = () => {
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected to database!");
  });
};
