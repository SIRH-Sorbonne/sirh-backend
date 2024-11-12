const express = require('express');
const router = express.Router();

const absenceController = require('../controllers/absenceController');
const workScheduleController = require('../controllers/workScheduleController');
const employeeWorkScheduleController = require('../controllers/employeeWorkScheduleController');

router.get('/absences', absenceController.getAllAbsences);
router.get('/absences/:id', absenceController.getAbsenceById);
router.post('/absences', absenceController.createAbsence);
router.put('/absences/:id', absenceController.updateAbsence);
router.delete('/absences/:id', absenceController.deleteAbsence);

router.get('/work_schedules', workScheduleController.getAllWorkSchedules);
router.get('/work_schedules/:id', workScheduleController.getWorkScheduleById);
router.post('/work_schedules', workScheduleController.createWorkSchedule);
router.put('/work_schedules/:id', workScheduleController.updateWorkSchedule);
router.delete('/work_schedules/:id', workScheduleController.deleteWorkSchedule);

router.get('/employee_work_schedules', employeeWorkScheduleController.getAllEmployeeWorkSchedules);
router.get('/employee_work_schedules/:id', employeeWorkScheduleController.getEmployeeWorkScheduleById);
router.post('/employee_work_schedules', employeeWorkScheduleController.createEmployeeWorkSchedule);
router.put('/employee_work_schedules/:id', employeeWorkScheduleController.updateEmployeeWorkSchedule);
router.delete('/employee_work_schedules/:id', employeeWorkScheduleController.deleteEmployeeWorkSchedule);




module.exports = router;