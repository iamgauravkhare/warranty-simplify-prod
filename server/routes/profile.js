import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { updateDisplayPicture, updateProfile } from "../controllers/profile.js";

const router = express.Router();

// update-profile-data-route
router.post("/update-profile", isAuthenticated, updateProfile);

// update-display-picture-route
router.post("/upload-display-picture", isAuthenticated, updateDisplayPicture);

export default router;
