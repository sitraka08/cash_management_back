import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import fs from "fs"; // Importer File System
import { addUpload } from "../lib/utils.js";

export const getUsers = async (_, res) => {
  // order by id
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const addUser = async (req, res) => {
  const { email, role, first_name } = req.body;
  const imagePath = req?.file?.path || null;

  try {
    const hashedPassword = await bcrypt.hash("password", 10);
    const newUser = await prisma.user.create({
      data: {
        first_name,
        email,
        password: hashedPassword,
        image: imagePath ? addUpload(req) : null,
        role,
      },
    });
    res
      .status(201)
      .json({ data: newUser, message: "User created successfully" });
  } catch (err) {
    if (imagePath) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("File deleted due to error");
        }
      });
    }
    res.status(500).json({ message: err.message });
  }
};
