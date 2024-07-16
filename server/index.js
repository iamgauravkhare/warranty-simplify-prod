import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import expressFileUpload from "express-fileupload";
import { databaseConnection } from "./config/database.js";
import { cloudinaryConnection } from "./config/cloudinary.js";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import consumerRoutes from "./routes/consumer.js";
import retailerRoutes from "./routes/retailer.js";
import manufacturerRoutes from "./routes/manufacturer.js";
import notificationRoutes from "./routes/notifications.js";

dotenv.config();
const PORT = process.env.PORT || 5500;
const app = express();
databaseConnection();
cloudinaryConnection();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(
  expressFileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/consumer-services", consumerRoutes);
app.use("/api/v1/retailer-services", retailerRoutes);
app.use("/api/v1/manufacturer-services", manufacturerRoutes);
app.use("/api/v1/notification", notificationRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running!",
  });
});

app.listen(PORT, () => {
  console.log("Server is up!");
});
