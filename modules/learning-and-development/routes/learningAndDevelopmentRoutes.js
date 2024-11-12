const express = require('express');
const router = express.Router();

const courseController = require('../controllers/courseController');
const employeeSkillController = require('../controllers/employeeSkillController');
const sessionController = require('../controllers/sessionController');

router.get('/courses', courseController.getAllCourses);
router.get('/courses/:id', courseController.getCourseById);
router.post('/courses', courseController.createCourse);
router.put('/courses/:id', courseController.updateCourse);
router.delete('/courses/:id', courseController.deleteCourse);

router.get('/employee_skills', employeeSkillController.getAllEmployeeSkills);
router.get('/employee_skills/:id', employeeSkillController.getEmployeeSkillById);
router.post('/employee_skills', employeeSkillController.createEmployeeSkill);
router.put('/employee_skills/:id', employeeSkillController.updateEmployeeSkill);
router.delete('/employee_skills/:id', employeeSkillController.deleteEmployeeSkill);

router.get('/sessions', sessionController.getAllSessions);
router.get('/sessions/:id', sessionController.getSessionById);
router.post('/sessions', sessionController.createSession);
router.put('/sessions/:id', sessionController.updateSession);
router.delete('/sessions/:id', sessionController.deleteSession);





module.exports = router;