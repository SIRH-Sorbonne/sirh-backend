const Session = require('../models/Session');

const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.getAllSessions(req.app.get('db'));
    res.status(200).json(sessions);
  } catch (error) {
    console.error('Erreur lors de la récupération des sessions :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des sessions' });
  }
};

const getSessionById = async (req, res) => {
  try {
    const session = await Session.getSessionById(req.app.get('db'), req.params.id);
    if (session) {
      res.status(200).json(session);
    } else {
      res.status(404).json({ message: 'Session non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la session :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la session' });
  }
};

const createSession = async (req, res) => {
  try {
    const sessionData = req.body;
    const newSessionId = await Session.createSession(req.app.get('db'), sessionData);
    res.status(201).json({ id: newSessionId[0], message: 'Session créée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création de la session :', error);
    res.status(500).json({ message: 'Erreur lors de la création de la session: ' + error.detail });
  }
};

const updateSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const sessionData = req.body;

    const updatedCount = await Session.updateSession(req.app.get('db'), sessionId, sessionData);
    if (updatedCount) {
      res.status(200).json({ message: 'Session mise à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Session non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la session :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la session' });
  }
};

const deleteSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    
    const deletedCount = await Session.deleteSession(req.app.get('db'), sessionId);
    if (deletedCount) {
      res.status(200).json({ message: 'Session supprimée avec succès' });
    } else {
      res.status(404).json({ message: 'Session non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de la session :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la session' });
  }
};

module.exports = {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
};
