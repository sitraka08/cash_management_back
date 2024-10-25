import express from "express";
import {
  addProf,
  deleteProf,
  getProf,
  updateProf,
} from "../controllers/prof.contoller.js";

const router = express.Router();

router.get("/", getProf);
router.post("/", addProf);
router.put("/:id", updateProf);
router.delete("/:id", deleteProf);

export default router;
