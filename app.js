import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import clientRoute from "./routes/client.route.js";
import profRoute from "./routes/prof.route.js";
import studentRoute from "./routes/student.route.js";
import equipmentRoute from "./routes/equipment.route.js";
import roomRoute from "./routes/room.route.js";
import trainingRoute from "./routes/training.route.js";

import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/clients", clientRoute);
app.use("/api/profs", profRoute);
app.use("/api/students", studentRoute);
app.use("/api/equipments", equipmentRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/trainings", trainingRoute);

app.listen(8000, () => {
  console.log("Server is running");
});
