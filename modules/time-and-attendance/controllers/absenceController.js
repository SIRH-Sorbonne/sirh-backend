const Absence = require('../models/Absence');

const getAllAbsences = async (req, res) => {
  try {
    const absences = await Absence.getAllAbsences(req.app.get('db'));
    res.status(200).json(absences);
  } catch (error) {
    console.error('Erreur lors de la récupération des absences :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des absences' });
  }
};

const getAbsenceById = async (req, res) => {
  try {
    const absence = await Absence.getAbsenceById(req.app.get('db'), req.params.id);
    if (absence) {
      res.status(200).json(absence);
    } else {
      res.status(404).json({ message: 'Absence non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'absence :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'absence' });
  }
};

const createAbsence = async (req, res) => {
  try {
    const absenceData = req.body;
    const newAbsenceId = await Absence.createAbsence(req.app.get('db'), absenceData);
    res.status(201).json({ id: newAbsenceId[0], message: 'Absence créée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création de l\'absence :', error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'absence: ' + error.detail });
  }
};

const updateAbsence = async (req, res) => {
  try {
    const absenceId = req.params.id;
    const absenceData = req.body;

    const updatedCount = await Absence.updateAbsence(req.app.get('db'), absenceId, absenceData);
    if (updatedCount) {
      res.status(200).json({ message: 'Absence mise à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Absence non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'absence :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'absence' });
  }
};

const deleteAbsence = async (req, res) => {
  try {
    const absenceId = req.params.id;
    
    const deletedCount = await Absence.deleteAbsence(req.app.get('db'), absenceId);
    if (deletedCount) {
      res.status(200).json({ message: 'Absence supprimée avec succès' });
    } else {
      res.status(404).json({ message: 'Absence non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'absence :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'absence' });
  }
};

module.exports = {
  getAllAbsences,
  getAbsenceById,
  createAbsence,
  updateAbsence,
  deleteAbsence,
};
