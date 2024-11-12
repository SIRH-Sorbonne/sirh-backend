const Course = require('../models/Course');

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.getAllCourses(req.app.get('db'));
    res.status(200).json(courses);
  } catch (error) {
    console.error('Erreur lors de la récupération des cours :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des cours' });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.getCourseById(req.app.get('db'), req.params.id);
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ message: 'Cours non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du cours :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du cours' });
  }
};

const createCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newCourseId = await Course.createCourse(req.app.get('db'), courseData);
    res.status(201).json({ id: newCourseId[0], message: 'Cours créé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création du cours :', error);
    res.status(500).json({ message: 'Erreur lors de la création du cours' });
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const courseData = req.body;

    const updatedCount = await Course.updateCourse(req.app.get('db'), courseId, courseData);
    if (updatedCount) {
      res.status(200).json({ message: 'Cours mis à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Cours non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du cours :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du cours' });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    
    const deletedCount = await Course.deleteCourse(req.app.get('db'), courseId);
    if (deletedCount) {
      res.status(200).json({ message: 'Cours supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Cours non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du cours :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du cours' });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};
