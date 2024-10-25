import express from "express";
import {
  getTraining,
  addTraining,
  upadateTraining,
} from "../controllers/training.controller.js";

const router = express.Router();

router.get("/", getTraining);
router.post("/", addTraining);
router.put("/:id", upadateTraining);

export default router;
