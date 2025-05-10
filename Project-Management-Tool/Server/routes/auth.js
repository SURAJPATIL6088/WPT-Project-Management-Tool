import { Router } from "express";
import { body, validationResult } from "express-validator";
import { registerAdmin, loginAdmin } from "../controllers/authController.js";

const router = Router();

router.post(
  "/register",
  [
    body("username").notEmpty().isLength({ min: 3 }),
    body("password").isLength({ min: 6 }),
  ],
  registerAdmin
);

router.post("/login", loginAdmin);

export default router;
