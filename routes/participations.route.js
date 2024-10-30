import express from "express";
import {
  addParticipation,
  deleteParticipation,
  getParticipations,
  updateParticipation,
} from "../controllers/participations.controller.js";

const router = express.Router();

router.get("/", getParticipations);
router.post("/", addParticipation);
router.put("/:id", updateParticipation);
router.delete("/:id", deleteParticipation);

export default router;
