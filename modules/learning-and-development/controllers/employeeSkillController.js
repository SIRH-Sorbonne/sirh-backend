const EmployeeSkill = require('../models/EmployeeSkill');

const getAllEmployeeSkills = async (req, res) => {
  try {
    const employeeSkills = await EmployeeSkill.getAllEmployeeSkills(req.app.get('db'));
    res.status(200).json(employeeSkills);
  } catch (error) {
    console.error('Erreur lors de la récupération des compétences des employés :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des compétences des employés' });
  }
};

const getEmployeeSkillById = async (req, res) => {
  try {
    const employeeSkill = await EmployeeSkill.getEmployeeSkillById(req.app.get('db'), req.params.id);
    if (employeeSkill) {
      res.status(200).json(employeeSkill);
    } else {
      res.status(404).json({ message: 'Compétence non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la compétence :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la compétence' });
  }
};

const createEmployeeSkill = async (req, res) => {
  try {
    const employeeSkillData = req.body;
    const newEmployeeSkillId = await EmployeeSkill.createEmployeeSkill(req.app.get('db'), employeeSkillData);
    res.status(201).json({ id: newEmployeeSkillId[0], message: 'Compétence créée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création de la compétence :', error);
    res.status(500).json({ message: 'Erreur lors de la création de la compétence: ' + error.detail });
  }
};

const updateEmployeeSkill = async (req, res) => {
  try {
    const employeeSkillId = req.params.id;
    const employeeSkillData = req.body;

    const updatedCount = await EmployeeSkill.updateEmployeeSkill(req.app.get('db'), employeeSkillId, employeeSkillData);
    if (updatedCount) {
      res.status(200).json({ message: 'Compétence mise à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Compétence non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la compétence :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la compétence' });
  }
};

const deleteEmployeeSkill = async (req, res) => {
  try {
    const employeeSkillId = req.params.id;
    
    const deletedCount = await EmployeeSkill.deleteEmployeeSkill(req.app.get('db'), employeeSkillId);
    if (deletedCount) {
      res.status(200).json({ message: 'Compétence supprimée avec succès' });
    } else {
      res.status(404).json({ message: 'Compétence non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de la compétence :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la compétence' });
  }
};

module.exports = {
  getAllEmployeeSkills,
  getEmployeeSkillById,
  createEmployeeSkill,
  updateEmployeeSkill,
  deleteEmployeeSkill
};
