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
import assignmentRoute from "./routes/assignment.route.js";
import participationsRoute from "./routes/participations.route.js";
import salesRoute from "./routes/sale.route.js";

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
app.use("/api/assignments", assignmentRoute);
app.use("/api/participations", participationsRoute);
app.use("/api/sales", salesRoute);

app.listen(3000, () => {
  console.log("Server is running");
});
