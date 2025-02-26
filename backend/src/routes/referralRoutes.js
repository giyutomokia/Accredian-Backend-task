import express from "express";
import { createReferral } from "../controllers/referralController.js";  // Import the referral controller

const router = express.Router();

// POST: Create referral route
router.post("/referral", createReferral);  // Handles POST /referral

export default router;
