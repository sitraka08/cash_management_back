import express from "express";
import {
  addEquipment,
  getEquipment,
  updateEquipment,
} from "../controllers/equipement.controller.js";

const router = express.Router();

router.get("/", getEquipment);
router.post("/", addEquipment);
router.put("/:id", updateEquipment);

export default router;
