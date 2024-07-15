import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  // changePassword,
  forgetPasswordOtp,
  resetPassword,
  signIn,
  signUp,
  userData,
} from "../controllers/auth.js";

const router = express.Router();

// sign-up-api-route
router.post("/sign-up", signUp);

// sign-in-api-route
router.post("/sign-in", signIn);

// user-data-api-route (if user is already logged in client side or token is available)
router.post("/user-data", isAuthenticated, userData);

router.post("/forget-password-otp", forgetPasswordOtp);
router.put("/reset-password", resetPassword);
// router.put("/change-password", isAuthenticated, changePassword);

export default router;
