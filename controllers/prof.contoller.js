import prisma from "../lib/prisma.js";
import { addZero } from "../lib/utils.js";

export const getProf = async (req, res) => {
  try {
    const profs = await prisma.professeur.findMany({
      orderBy: {
        id: "desc",
      },
    });
    res.status(200).json({ profs });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get!" });
  }
};

export const addProf = async (req, res) => {
  const { nom, adresse, email, prenom } = req.body;
  try {
    const count = await prisma.professeur.count();
    const profs = await prisma.professeur.create({
      data: {
        ref: `${addZero(count + 1)}W-P`,
        nom,
        prenom,
        adresse,
        email,
      },
    });
    res.status(201).json({ profs: profs, message: "Created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
