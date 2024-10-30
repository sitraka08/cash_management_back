import prisma from "../lib/prisma.js";

export const get = async (_, res) => {
  try {
    const sales = await prisma.sale.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        client: true,
        equipment: true,
      },
    });
    res.status(200).json({ sales });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const add = async (req, res) => {
  const { client_id, equipment_id, sale_date } = req.body;
  try {
    const sale = await prisma.sale.create({
      data: {
        client_id: parseInt(client_id),
        equipment_id: parseInt(equipment_id),
        sale_date: new Date(sale_date),
      },
    });

    res.status(200).json({ sale, message: "Created" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { client_id, equipment_id, sale_date } = req.body;

  try {
    const sale = await prisma.sale.update({
      data: {
        client_id: parseInt(client_id),
        equipment_id: parseInt(equipment_id),
        sale_date: new Date(sale_date),
      },
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({ sale, message: "Updated" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.sale.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
