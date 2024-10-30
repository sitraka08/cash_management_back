import prisma from "../lib/prisma.js";

// model Participation {
//     id                 Int      @id @default(autoincrement())
//     participation_date DateTime
//     student_id         Int
//     training_id        Int
//     // Relations
//     student            Student  @relation(fields: [student_id], references: [id])
//     training           Training @relation(fields: [training_id], references: [id])
//   }

export const getParticipations = async (req, res) => {
  try {
    const participations = await prisma.participation.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        student: true,
        training: true,
      },
    });
    res.status(200).json({ participations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addParticipation = async (req, res) => {
  const { participation_date, student_id, training_id } = req.body;
  try {
    const participation = await prisma.participation.create({
      data: {
        participation_date: new Date(participation_date),
        student_id: parseInt(student_id),
        training_id: parseInt(training_id),
      },
    });
    res.status(201).json({ participation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateParticipation = async (req, res) => {
  const { id } = req.params;
  const { participation_date, student_id, training_id } = req.body;
  try {
    const participation = await prisma.participation.update({
      where: {
        id: parseInt(id),
      },
      data: {
        participation_date: new Date(participation_date),
        student_id: parseInt(student_id),
        training_id: parseInt(training_id),
      },
    });
    res.status(200).json({ participation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteParticipation = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.participation.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ message: "Participation deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
