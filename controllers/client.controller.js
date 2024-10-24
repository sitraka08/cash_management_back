import prisma from "../lib/prisma.js";
import { addZero } from "../lib/utils.js";

export const getClient = async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      orderBy: {
        id: "desc",
      },
    });
    res.status(200).json({ clients });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const addClient = async (req, res) => {
  const { nom, adresse, email, prenom } = req.body;
  try {
    const clientCount = await prisma.client.count();
    const newClient = await prisma.client.create({
      data: {
        ref: `${addZero(clientCount + 1)}W-C`,
        nom,
        prenom,
        adresse,
        email,
      },
    });
    res.status(201).json({ clients: newClient, message: "Created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
