import prisma from "../lib/prisma.js";
import { addUpload, addZero, getFilePath, removeUpload } from "../lib/utils.js";
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
  const { nom, adresse, email, prenom } = req.body;
  const imagePath = req?.file?.path || null;
  try {
    const count = await prisma.student.count();
    const students = await prisma.student.create({
      data: {
        matricule: `${addZero(count + 1)}W-E`,
        nom,
        prenom,
        adresse,
        email,
        image: imagePath ? addUpload(req) : null,
      },
    });
    res.status(201).json({ etudiants: etudiants, message: "Created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateEtudiant = async (req, res) => {
  const id = req.params.id;
  const { nom, adresse, email, prenom, image, matricule } = req.body;
  try {
    const oneStudent = await prisma.etudiant.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (req.file) {
      fs.unlink(oneStudent.image, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("File deleted due to error");
        }
      });
    }
    const etudiant = await prisma.etudiant.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nom,
        adresse,
        email,
        matricule,
        prenom,
        image: req.file ? addUpload(req) : image,
      },
    });
    res.status(200).json({ etudiant, message: "Updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
