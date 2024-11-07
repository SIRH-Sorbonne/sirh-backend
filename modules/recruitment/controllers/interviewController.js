const Interview = require('../models/Interview');

const getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.getAllInterviews(req.app.get('db'));
    res.status(200).json(interviews);
  } catch (error) {
    console.error('Erreur lors de la récupération des entretiens :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des entretiens' });
  }
};

const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.getInterviewById(req.app.get('db'), req.params.id);
    if (interview) {
      res.status(200).json(interview);
    } else {
      res.status(404).json({ message: 'Entretien non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'entretien :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'entretien' });
  }
};

const createInterview = async (req, res) => {
  console.log('Création de l\'entretien :', req.body);
  try {
    const newInterviewId = await Interview.createInterview(req.app.get('db'), req.body);
    console.log('newInterviewId', newInterviewId);
    res.status(201).json({ id: newInterviewId[0], message: 'Entretien créé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création de l\'entretien :', error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'entretien: ' + error.detail });
  }
};

const updateInterview = async (req, res) => {
  try {
    const updatedCount = await Interview.updateInterview(req.app.get('db'), req.params.id, req.body);
    if (updatedCount) {
      res.status(200).json({ message: 'Entretien mis à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Entretien non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'entretien :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'entretien' });
  }
};

const deleteInterview = async (req, res) => {
  try {
    const deletedCount = await Interview.deleteInterview(req.app.get('db'), req.params.id);
    if (deletedCount) {
      res.status(200).json({ message: 'Entretien supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Entretien non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'entretien :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'entretien' });
  }
};

module.exports = {
  getAllInterviews,
  getInterviewById,
  createInterview,
  updateInterview,
  deleteInterview
};