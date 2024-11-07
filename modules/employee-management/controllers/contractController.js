const Contract = require('../models/Contract');

const getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.getAllContracts(req.app.get('db'));
    res.status(200).json(contracts);
  } catch (error) {
    console.error('Erreur lors de la récupération des contrats :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des contrats' });
  }
};

const getContractById = async (req, res) => {
  try {
    const contract = await Contract.getContractById(req.app.get('db'), req.params.id);
    if (contract) {
      res.status(200).json(contract);
    } else {
      res.status(404).json({ message: 'Contrat non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du contrat :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du contrat' });
  }
};

const createContract = async (req, res) => {
  try {
    const contractData = req.body;
    const newContractId = await Contract.createContract(req.app.get('db'), contractData);
    res.status(201).json({ id: newContractId[0], message: 'Contrat créé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création du contrat :', error);
    if (error.code === '23505') { // Code d'erreur pour violation d'unicité
      res.status(409).json({ message: 'Un contrat avec cet ID d\'employé existe déjà' });
    } else {
      res.status(500).json({ message: 'Erreur lors de la création du contrat' });
    }
  }
};

const updateContract = async (req, res) => {
  try {
    const contractId = req.params.id;
    const contractData = req.body;

    const updatedCount = await Contract.updateContract(req.app.get('db'), contractId, contractData);
    if (updatedCount) {
      res.status(200).json({ message: 'Contrat mis à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Contrat non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du contrat :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du contrat' });
  }
};

const deleteContract = async (req, res) => {
  try {
    const contractId = req.params.id;
    
    const deletedCount = await Contract.deleteContract(req.app.get('db'), contractId);
    if (deletedCount) {
      res.status(200).json({ message: 'Contrat supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Contrat non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du contrat :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du contrat' });
  }
};

module.exports = {
  getAllContracts,
  getContractById,
  createContract,
  updateContract,
  deleteContract
};