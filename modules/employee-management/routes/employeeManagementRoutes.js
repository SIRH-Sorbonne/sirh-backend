const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const contractController = require('../controllers/contractController');

router.get('/employees', employeeController.getAllEmployees);
router.get('/employees/:id', employeeController.getEmployeeById);
router.post('/employees', employeeController.createEmployee);
router.put('/employees/:id', employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);

router.get('/contracts', contractController.getAllContracts);
router.get('/contracts/:id', contractController.getContractById);
router.post('/contracts', contractController.createContract);
router.put('/contracts/:id', contractController.updateContract);
router.delete('/contracts/:id', contractController.deleteContract);

module.exports = router;
