import express from "express";
import {
  addAssignment,
  deleteAssignment,
  getAssignments,
  updateAssignment,
} from "../controllers/assignment.controller.js";

const router = express.Router();

router.get("/", getAssignments);
router.post("/", addAssignment);
router.put("/:id", updateAssignment);
router.delete("/:id", deleteAssignment);

export default router;
