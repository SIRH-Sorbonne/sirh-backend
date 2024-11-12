const WorkSchedule = require('../models/WorkSchedule');

const getAllWorkSchedules = async (req, res) => {
  try {
    const schedules = await WorkSchedule.getAllWorkSchedules(req.app.get('db'));
    res.status(200).json(schedules);
  } catch (error) {
    console.error('Erreur lors de la récupération des horaires de travail :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des horaires de travail' });
  }
};

const getWorkScheduleById = async (req, res) => {
  try {
    const schedule = await WorkSchedule.getWorkScheduleById(req.app.get('db'), req.params.id);
    if (schedule) {
      res.status(200).json(schedule);
    } else {
      res.status(404).json({ message: 'Horaire non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'horaire :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'horaire' });
  }
};

const createWorkSchedule = async (req, res) => {
  try {
    const scheduleData = req.body;
    const newScheduleId = await WorkSchedule.createWorkSchedule(req.app.get('db'), scheduleData);
    res.status(201).json({ id: newScheduleId[0], message: 'Horaire créé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création de l\'horaire :', error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'horaire' });
  }
};

const updateWorkSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;
    const scheduleData = req.body;

    const updatedCount = await WorkSchedule.updateWorkSchedule(req.app.get('db'), scheduleId, scheduleData);
    if (updatedCount) {
      res.status(200).json({ message: 'Horaire mis à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Horaire non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'horaire :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'horaire' });
  }
};

const deleteWorkSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;

    const deletedCount = await WorkSchedule.deleteWorkSchedule(req.app.get('db'), scheduleId);
    if (deletedCount) {
      res.status(200).json({ message: 'Horaire supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Horaire non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'horaire :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'horaire' });
  }
};

module.exports = {
  getAllWorkSchedules,
  getWorkScheduleById,
  createWorkSchedule,
  updateWorkSchedule,
  deleteWorkSchedule,
};
