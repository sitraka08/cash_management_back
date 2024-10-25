import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import fs from "fs"; // Importer File System

const DURATION = 15 * 60 * 1000;

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials!" });
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        first_name: user.first_name,
        image: user.image,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: DURATION }
    );
    const { password: userPassword, ...userInfo } = user;
    res.status(200).json({ userInfo, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = (req, res) => {};
