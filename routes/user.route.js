import express from "express";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { upload } from "../lib/multer.js";

const router = express.Router();

router.get("/", verifyToken, getUsers);
router.post("/", verifyToken, upload.single("image"), addUser);
router.put("/:id", verifyToken, upload.single("image"), updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
