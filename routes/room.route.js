import express from "express";
import {
  getRoom,
  addRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/room.controller.js";

const router = express.Router();

router.get("/", getRoom);
router.post("/", addRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

export default router;
