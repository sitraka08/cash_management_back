import express from "express";
import { add, get, update, remove } from "../controllers/sale.controller.js";

const router = express.Router();

router.get("/", get);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
