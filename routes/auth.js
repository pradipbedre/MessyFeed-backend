import express from "express";
const router = express.Router();
import {
  signup,
  signin,
  changePassword,
  signout,
} from "../controllers/auth.js";
import { verifyToken } from "../verifyToken.js";

// POST /auth/signup
router.post("/signup", signup);

// POST /auth/login
router.post("/signin", signin);

// POST /googlelogin

//Change Password
router.put("/changePassword", verifyToken, changePassword);

// GET /auth/signout
router.get("/signout", verifyToken, signout);

//export default router;
export default router;