const JobOffer = require('../models/JobOffer');

const getAllJobOffers = async (req, res) => {
  try {
    const jobOffers = await JobOffer.getAllJobOffers(req.app.get('db'));
    res.status(200).json(jobOffers);
  } catch (error) {
    console.error('Erreur lors de la récupération des offres d\'emploi :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des offres d\'emploi' });
  }
};

const getJobOfferById = async (req, res) => {
  try {
    const jobOffer = await JobOffer.getJobOfferById(req.app.get('db'), req.params.id);
    if (jobOffer) {
      res.status(200).json(jobOffer);
    } else {
      res.status(404).json({ message: 'Offre d\'emploi non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'offre d\'emploi :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'offre d\'emploi' });
  }
};

const createJobOffer = async (req, res) => {
  try {
    const newJobOfferId = await JobOffer.createJobOffer(req.app.get('db'), req.body);
    res.status(201).json({ id: newJobOfferId[0], message: 'Offre d\'emploi créée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création de l\'offre d\'emploi :', error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'offre d\'emploi' });
  }
};

const updateJobOffer = async (req, res) => {
  try {
    const updatedCount = await JobOffer.updateJobOffer(req.app.get('db'), req.params.id, req.body);
    if (updatedCount) {
      res.status(200).json({ message: 'Offre d\'emploi mise à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Offre d\'emploi non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'offre d\'emploi :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'offre d\'emploi' });
  }
};

const deleteJobOffer = async (req, res) => {
  try {
    const deletedCount = await JobOffer.deleteJobOffer(req.app.get('db'), req.params.id);
    if (deletedCount) {
      res.status(200).json({ message: 'Offre d\'emploi supprimée avec succès' });
    } else {
      res.status(404).json({ message: 'Offre d\'emploi non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'offre d\'emploi :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'offre d\'emploi' });
  }
};

module.exports = {
  getAllJobOffers,
  getJobOfferById,
  createJobOffer,
  updateJobOffer,
  deleteJobOffer
};