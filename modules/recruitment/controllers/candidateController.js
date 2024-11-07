const Candidate = require('../models/Candidate');
const CandidateService = require('../services/candidates.service');


const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.getAllCandidates(req.app.get('db'));
    res.status(200).json(candidates);
  } catch (error) {
    console.error('Erreur lors de la récupération des candidats :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des candidats' });
  }
};

const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.getCandidateById(req.app.get('db'), req.params.id);
    if (candidate) {
      res.status(200).json(candidate);
    } else {
      res.status(404).json({ message: 'Candidat non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du candidat :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du candidat' });
  }
};

const createCandidate = async (req, res) => {
  console.log('Création du candidat :', req.body);
  try {
    const candidateService = new CandidateService(req.app.get('db'));
    const newCandidateId = await candidateService.createCandidate(req.body);
    res.status(201).json({ id: newCandidateId, message: 'Candidat créé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création du candidat :', error);
    if (error.message === 'Un candidat avec cet email existe déjà') {
      res.status(409).json({ message: error.message });
    } else if (error.message === 'Les champs first_name, last_name et email sont obligatoires') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Erreur lors de la création du candidat' });
    }
  }
};

const updateCandidate = async (req, res) => {
  try {
    const updatedCount = await Candidate.updateCandidate(req.app.get('db'), req.params.id, req.body);
    if (updatedCount) {
      res.status(200).json({ message: 'Candidat mis à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Candidat non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du candidat :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du candidat' });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const deletedCount = await Candidate.deleteCandidate(req.app.get('db'), req.params.id);
    if (deletedCount) {
      res.status(200).json({ message: 'Candidat supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Candidat non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du candidat :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du candidat' });
  }
};

module.exports = {
  getAllCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate
};