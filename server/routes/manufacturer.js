import express from "express";
import { isAuthenticated, isManufacturer } from "../middlewares/auth.js";
import {
  approveClaim,
  claimedWarranties,
  getClaimData,
} from "../controllers/manufacturer.js";

const router = express.Router();

// fetching all claimed warranties data for manufacturer
router.get(
  "/claimed-warranties",
  isAuthenticated,
  isManufacturer,
  claimedWarranties
);

// fetching individual claim data route
router.post("/get-claim-data", isAuthenticated, isManufacturer, getClaimData);

// updating claim status route
router.post("/approve-claim", isAuthenticated, isManufacturer, approveClaim);

export default router;
