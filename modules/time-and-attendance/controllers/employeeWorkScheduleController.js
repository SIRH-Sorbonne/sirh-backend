const EmployeeWorkSchedule = require('../models/EmployeeWorkSchedule');

const getAllEmployeeWorkSchedules = async (req, res) => {
  try {
    const schedules = await EmployeeWorkSchedule.getAllEmployeeWorkSchedules(req.app.get("db"));
    res.status(200).json(schedules);
  } catch (error) {
    console.error("Erreur lors de la récupération des horaires des employés :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des horaires des employés" });
  }
};

const getEmployeeWorkScheduleById = async (req, res) => {
  try {
    const schedule = await EmployeeWorkSchedule.getEmployeeWorkScheduleById(req.app.get("db"), req.params.id);
    if (schedule) {
      res.status(200).json(schedule);
    } else {
      res.status(404).json({ message: "Horaire non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'horaire :", error);
    res.status(500).json({ message: "Erreur lors de la récupération de l'horaire" });
  }
};

const createEmployeeWorkSchedule = async (req, res) => {
  try {
    const scheduleData = req.body;
    const newScheduleId = await EmployeeWorkSchedule.createEmployeeWorkSchedule(req.app.get("db"), scheduleData);
    res.status(201).json({ id: newScheduleId[0], message: "Horaire créé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la création de l'horaire :", error);
    res.status(500).json({ message: "Erreur lors de la création de l'horaire: " + error.detail });
  }
};

const updateEmployeeWorkSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;
    const scheduleData = req.body;

    const updatedCount = await EmployeeWorkSchedule.updateEmployeeWorkSchedule(req.app.get("db"), scheduleId, scheduleData);
    if (updatedCount) {
      res.status(200).json({ message: "Horaire mis à jour avec succès" });
    } else {
      res.status(404).json({ message: "Horaire non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'horaire :", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'horaire" });
  }
};

const deleteEmployeeWorkSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;

    const deletedCount = await EmployeeWorkSchedule.deleteEmployeeWorkSchedule(req.app.get("db"), scheduleId);
    if (deletedCount) {
      res.status(200).json({ message: "Horaire supprimé avec succès" });
    } else {
      res.status(404).json({ message: "Horaire non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'horaire :", error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'horaire" });
  }
};

module.exports = {
  getAllEmployeeWorkSchedules,
  getEmployeeWorkScheduleById,
  createEmployeeWorkSchedule,
  updateEmployeeWorkSchedule,
  deleteEmployeeWorkSchedule,
};
