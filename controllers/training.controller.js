import prisma from "../lib/prisma.js";

export const getTraining = async (_, res) => {
  try {
    const trainings = await prisma.training.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.status(200).json({ trainings });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const addTraining = async (req, res) => {
  {
    const { training_name, participation_fee, duration } = req.body;

    try {
      const training = await prisma.training.create({
        data: {
          training_name,
          participation_fee: parseFloat(participation_fee),
          duration: parseInt(duration),
        },
      });

      res.status(201).json({ training, message: "Created" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
};

export const upadateTraining = async (req, res) => {
  const { id } = req.params;
  const { training_name, participation_fee, duration } = req.body;

  try {
    const training = await prisma.training.update({
      data: {
        training_name,
        participation_fee: parseFloat(participation_fee),
        duration: parseInt(duration),
      },
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({ training });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
