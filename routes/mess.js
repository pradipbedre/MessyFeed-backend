import express from "express";
import {
  addMess,
  addPlan,
  deleteMess,
  deletePlan,
  getMess,
  getPlans,
  updateMess,
  updatePlan,
  getMessPlans,
  getMessWithToken,
  getMessCommon,
} from "../controllers/mess.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// View all mess plans
router.get("/plans", verifyToken, getPlans);

//Register mess
router.post("/", verifyToken, addMess);

//Update mess
router.put("/", verifyToken, updateMess);

//Delete mess
router.delete("/", verifyToken, deleteMess);

//View mess
router.get("/", verifyToken, getMessWithToken);

// get mess for customer
router.get("/", verifyToken, getMess);

// get mess details
router.get("/search/:id", getMessCommon);

//Add new mess plan
router.post("/plan", verifyToken, addPlan);

//Update a mess plan
router.put("/plan/:id", verifyToken, updatePlan);

//Delete a mess plan
router.delete("/plan/:id", verifyToken, deletePlan);

// all plans for specific mess using id
router.get("/plans/:id", getMessPlans);

export default router;
