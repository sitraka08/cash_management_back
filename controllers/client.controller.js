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
  const { first_name, address, email, last_name } = req.body;
  try {
    const clientCount = await prisma.client.count();
    const newClient = await prisma.client.create({
      data: {
        ref: `${addZero(clientCount + 1)}W-C`,
        first_name,
        address,
        email,
        last_name,
      },
    });
    res.status(201).json({ clients: newClient, message: "Created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateClient = async (req, res) => {
  const { id } = req.params;
  const { first_name, address, email, last_name } = req.body;
  try {
    const client = await prisma.client.update({
      where: {
        id: parseInt(id),
      },
      data: {
        first_name,
        address,
        email,
        last_name,
      },
    });

    res.status(200).json({ clients: client, message: "Created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCLient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await prisma.client.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ client, message: "Deleted" });
  } catch (error) {}
};
