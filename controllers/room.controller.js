import prisma from "../lib/prisma.js";

export const addRoom = async (req, res) => {
  const { room_number, rental_price } = req.body;
  console.log(req.body);

  try {
    const room = await prisma.room.create({
      data: {
        room_number,
        rental_price: parseFloat(rental_price),
      },
    });
    res.status(201).json({ room, message: "Created" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getRoom = async (_, res) => {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: {
        id: "desc",
      },
    });
    res.status(200).json({ rooms });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { room_number, rental_price } = req.body;

  try {
    const room = await prisma.room.update({
      where: {
        id: parseInt(id),
      },
      data: {
        room_number,
        rental_price,
      },
    });
    res.status(200).json({ room });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteRoom = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.room.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
