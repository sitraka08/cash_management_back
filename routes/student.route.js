import express from "express";
import {
  addStudent,
  deleteStudent,
  getStudent,
  updateStudent,
} from "../controllers/student.controller.js";
import { upload } from "../lib/multer.js";

const router = express.Router();

router.get("/", getStudent);
router.post("/", upload.single("image"), addStudent);
router.put("/:id", upload.single("image"), updateStudent);
router.delete("/:id", deleteStudent);

export default router;
