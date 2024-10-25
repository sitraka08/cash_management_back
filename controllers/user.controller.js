import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import fs from "fs"; // Importer File System
import { deleteFile, filePath } from "../lib/utils.js";

export const getUsers = async (_, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        email: true,
        role: true,
        first_name: true,
        image: true,
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

  try {
    const hashedPassword = await bcrypt.hash("password", 10);
    const newUser = await prisma.user.create({
      data: {
        first_name,
        email,
        password: hashedPassword,
        image: req?.file ? filePath(req) : null,
        role,
      },
    });
    res.status(201).json({ data: newUser, message: "Created" });
  } catch (err) {
    if (filePath(req)) {
      deleteFile(filePath(req));
    }
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, role, first_name, image } = req.body;

  try {
    const oneUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        image: true,
      },
    });

    if (req?.file && oneUser.image) {
      deleteFile(oneUser.image);
    }

    const user = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        email,
        role,
        first_name,
        image: req?.file ? filePath(req) : image,
      },
    });

    res.status(200).json({ message: "Updated" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const oneUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        image: true,
      },
    });

    if (oneUser.image) {
      deleteFile(oneUser.image);
    }

    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
