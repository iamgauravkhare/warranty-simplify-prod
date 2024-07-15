import express from "express";
import { isAuthenticated, isRetailer } from "../middlewares/auth.js";
import {
  forwardClaimToManufacture,
  getAssociations,
  getClaimData,
  getReClaimedWarrantyData,
  setAssociatedBrandData,
} from "../controllers/retailer.js";

const router = express.Router();

// fetching all claimed warranties data for retailer
router.get(
  "/claimed-warranties",
  isAuthenticated,
  isRetailer,
  getReClaimedWarrantyData
);

// update-claim-route
router.post(
  "/forward-claim",
  isAuthenticated,
  isRetailer,
  forwardClaimToManufacture
);

// adding retailer to brands route
router.post(
  "/set-brand-associations",
  isAuthenticated,
  isRetailer,
  setAssociatedBrandData
);

// fetching individual claim data route
router.post("/get-claim-data", isAuthenticated, isRetailer, getClaimData);

// fetching all retailer associated brands data route
router.get(
  "/retailer-associations",
  isAuthenticated,
  isRetailer,
  getAssociations
);

export default router;
