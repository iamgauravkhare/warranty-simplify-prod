import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { markAsRead } from "../controllers/notifications.js";

const router = express.Router();

// mark-notification-as-read-api-handler
router.post("/mark-as-read", isAuthenticated, markAsRead);

export default router;
