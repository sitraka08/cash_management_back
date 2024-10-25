import express from "express";
import {
  addEquipment,
  getEquipment,
} from "../controllers/equipement.controller.js";

const router = express.Router();

router.get("/", getEquipment);
router.post("/", addEquipment);

export default router;
