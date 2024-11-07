// services/candidateService.js

const Candidate = require('../models/Candidate');

class CandidateService {
  constructor(db) {
    this.db = db;
  }

  async createCandidate(candidateData) {
    console.log('Création du candidat :', candidateData);   
    try {
      // Validation des données
      if (!candidateData.first_name || !candidateData.last_name || !candidateData.email) {
        throw new Error('Les champs first_name, last_name et email sont obligatoires');
      }

      // Vérification si l'email existe déjà
      const existingCandidate = await Candidate.getCandidateByEmail(this.db, candidateData.email);
      if (existingCandidate) {
        throw new Error('Un candidat avec cet email existe déjà');
      }

      // Création du candidat
      const newCandidateId = await Candidate.createCandidate(this.db, {
        first_name: candidateData.first_name,
        last_name: candidateData.last_name,
        email: candidateData.email,
        phone: candidateData.phone,
        resume_url: candidateData.resume_url,
        status: candidateData.status || 'new'
      });

      return newCandidateId[0];
    } catch (error) {
      console.error('Erreur dans le service createCandidate:', error);
      throw error;
    }
  }


  // Autres méthodes du service...
}

module.exports = CandidateService;