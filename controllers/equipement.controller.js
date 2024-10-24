import prisma from "../lib/prisma";

const addEquipment = async (req, res) => {
    const {designn}
  try {
    const equipmentCount =  await prisma.materiel.count()
    const newEquipement = prisma.materiel.create()
    
  } catch (error) {
    
  }
};
