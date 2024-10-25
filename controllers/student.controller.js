import prisma from "../lib/prisma.js";
import { filePath, addZero, deleteFile } from "../lib/utils.js";
import fs from "fs"; // Importer File System

export const getStudent = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      orderBy: {
        id: "desc",
      },
    });
    res.status(200).json({ students });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get!" });
  }
};

export const addStudent = async (req, res) => {
  const { first_name, last_name, email, address } = req.body;

  try {
    const count = await prisma.student.count();
    const students = await prisma.student.create({
      data: {
        registration: `${addZero(count + 1)}W-E`,
        first_name,
        last_name,
        email,
        address,
        image: req?.file ? filePath(req) : null,
      },
    });
    res.status(201).json({ students: students, message: "Created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, address, image } = req.body;
  try {
    const oneStudent = await prisma.student.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    console.log(oneStudent, "onesere");

    if (req?.file && oneStudent.image) {
      deleteFile(oneStudent.image);
    }

    const student = await prisma.student.update({
      where: {
        id: parseInt(id),
      },
      data: {
        first_name,
        last_name,
        email,
        address,
        image: req.file ? filePath(req) : image,
      },
    });
    res.status(200).json({ student, message: "Updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ student, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
