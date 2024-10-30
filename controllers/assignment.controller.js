import prisma from "../lib/prisma.js";

export const getAssignments = async (req, res) => {
  try {
    const assignments = await prisma.assignment.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        professor: true,
        training: true,
      },
    });
    res.status(200).json({ assignments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addAssignment = async (req, res) => {
  const { assignment_date, professor_id, training_id, salary } = req.body;
  try {
    const newAssignment = await prisma.assignment.create({
      data: {
        salary: parseFloat(salary),
        assignment_date: new Date(assignment_date),
        professor_id,
        training_id,
      },
    });
    res.status(201).json({ newAssignment, message: "Created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAssignment = async (req, res) => {
  const { id } = req.params;
  const { assignment_date, professor_id, training_id, salary } = req.body;
  try {
    const updatedAssignment = await prisma.assignment.update({
      where: {
        id: parseInt(id),
      },
      data: {
        salary: parseFloat(salary),
        assignment_date: new Date(assignment_date),
        professor_id,
        training_id,
      },
    });
    res.status(200).json({ updatedAssignment, message: "Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAssignment = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.assignment.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
