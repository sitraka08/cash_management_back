import prisma from "../lib/prisma.js";
import { addZero } from "../lib/utils.js";

export const getEquipment = async (_, res) => {
  try {
    const equipments = await prisma.equipment.findMany({
      orderBy: {
        id: "desc",
      },
    });
    res.status(200).json({ equipments });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const addEquipment = async (req, res) => {
  const { design, purchase_price, sale_price } = req.body;
  try {
    const equipmentCount = await prisma.equipment.count();
    const equipment = await prisma.equipment.create({
      data: {
        ref: `${addZero(equipmentCount + 1)}W-M`,
        design,
        purchase_price: parseFloat(purchase_price),
        sale_price: parseFloat(sale_price),
      },
    });

    res.status(200).json({ equipment, message: "Created" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateEquipment = async (req, res) => {
  const { id } = req.params;
  const { design, purchase_price, sale_price } = req.body;
  try {
    const equipmentCount = await prisma.equipment.count();
    const equipment = await prisma.equipment.update({
      data: {
        ref: `${addZero(equipmentCount + 1)}W-M`,
        design,
        purchase_price: parseFloat(purchase_price),
        sale_price: parseFloat(sale_price),
      },
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({ equipment, message: "Updated" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
