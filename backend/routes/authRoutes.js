import express from "express";
import { sendOtp, verifyOtp, sendMagicLink } from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/send-magic-link", sendMagicLink);

export default router;