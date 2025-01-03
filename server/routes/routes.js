import express from "express";
import { login, logout, signup, verifyEmail, forgotPassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verifyEmail", verifyEmail);
router.post("/forgotPassword", forgotPassword);

export default router;