import express from "express";
import { addClient, getClient } from "../controllers/client.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getClient);
router.post("/", verifyToken, addClient);

export default router;
