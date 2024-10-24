import express from "express";
import { addProf, getProf } from "../controllers/prof.contoller.js";

const router = express.Router();

router.get("/", getProf);
router.post("/", addProf);

export default router;
