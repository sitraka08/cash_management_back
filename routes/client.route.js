import express from "express";
import {
  addClient,
  getClient,
  updateClient,
  deleteCLient,
} from "../controllers/client.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getClient);
router.post("/", verifyToken, addClient);
router.put("/:id", verifyToken, updateClient);
router.delete("/:id", verifyToken, deleteCLient);

export default router;
