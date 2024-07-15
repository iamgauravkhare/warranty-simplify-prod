import express from "express";
import { isAuthenticated, isConsumer } from "../middlewares/auth.js";
import {
  checkWarrantyExpiry,
  claimWarranty,
  getClaimData,
  getClaimWarranties,
  getRegisteredWarranties,
  registerWarranty,
} from "../controllers/consumer.js";

const router = express.Router();

// register-warranty-route
router.post(
  "/register-warranty",
  isAuthenticated,
  isConsumer,
  registerWarranty
);

// warranty expiry checking route
router.post(
  "/check-warranty/:productId",
  isAuthenticated,
  isConsumer,
  checkWarrantyExpiry
);

// claim-warranty-route
router.post("/claim-warranty", isAuthenticated, isConsumer, claimWarranty);

// fetching all claimed warranties of consumer
router.get(
  "/get-claimed-warranty",
  isAuthenticated,
  isConsumer,
  getClaimWarranties
);

// fetching all registered warranties of consumer
router.get(
  "/get-registered-warranty",
  isAuthenticated,
  isConsumer,
  getRegisteredWarranties
);

// fetching individual claim data route
router.post("/get-claim-data", isAuthenticated, isConsumer, getClaimData);

export default router;
