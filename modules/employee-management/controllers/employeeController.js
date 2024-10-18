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

module.exports = {
  getAllEmployees
};