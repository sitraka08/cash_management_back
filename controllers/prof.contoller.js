import prisma from "../lib/prisma.js";
import { addZero } from "../lib/utils.js";

export const getProf = async (req, res) => {
  try {
    const profs = await prisma.professor.findMany({
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
  const { first_name, last_name, email, address } = req.body;
  try {
    const count = await prisma.professor.count();
    const profs = await prisma.professor.create({
      data: {
        ref: `${addZero(count + 1)}W-P`,
        first_name,
        last_name,
        email,
        address,
      },
    });
    res.status(201).json({ profs: profs, message: "Created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProf = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, address } = req.body;

  try {
    const prof = await prisma.professor.update({
      where: {
        id: parseInt(id),
      },
      data: {
        first_name,
        last_name,
        email,
        address,
      },
    });
    res.status(200).json({ prof, message: "Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProf = async (req, res) => {
  const { id } = req.params;
  try {
    const prof = await prisma.professor.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ prof, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
