const Employee = require('../models/Employee');

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.getAllEmployees(req.app.get('db'));
    res.status(200).json(employees);
  } catch (error) {
    console.error('Erreur lors de la récupération des employés :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des employés' });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.getEmployeeById(req.app.get('db'), req.params.id);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: 'Employé non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'employé :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'employé' });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employeeData = req.body;
    const newEmployeeId = await Employee.createEmployee(req.app.get('db'), employeeData);
    res.status(201).json({ id: newEmployeeId[0], message: 'Employé créé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création de l\'employé :', error);
    if (error.code === '23505') { // Code d'erreur pour violation d'unicité
      res.status(409).json({ message: 'Un employé avec cet email existe déjà' });
    } else {
      res.status(500).json({ message: 'Erreur lors de la création de l\'employé' });
    }
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employeeData = req.body;

    const updatedCount = await Employee.updateEmployee(req.app.get('db'), employeeId, employeeData);
    if (updatedCount) {
      res.status(200).json({ message: 'Employé mis à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Employé non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'employé :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'employé' });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    
    const deletedCount = await Employee.deleteEmployee(req.app.get('db'), employeeId);
    if (deletedCount) {
      res.status(200).json({ message: 'Employé supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Employé non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'employé :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'employé' });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};