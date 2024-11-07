const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const interviewController = require('../controllers/interviewController');
const jobOfferController = require('../controllers/jobOfferController');

// Routes pour les candidats
router.get('/candidates', candidateController.getAllCandidates);
router.get('/candidates/:id', candidateController.getCandidateById);
router.post('/candidates', candidateController.createCandidate);
router.put('/candidates/:id', candidateController.updateCandidate);
router.delete('/candidates/:id', candidateController.deleteCandidate);

// Routes pour les entretiens
router.get('/interviews', interviewController.getAllInterviews);
router.get('/interviews/:id', interviewController.getInterviewById);
router.post('/interviews', interviewController.createInterview);
router.put('/interviews/:id', interviewController.updateInterview);
router.delete('/interviews/:id', interviewController.deleteInterview);

// Routes pour les offres d'emploi
router.get('/job_offers', jobOfferController.getAllJobOffers);
router.get('/job_offers/:id', jobOfferController.getJobOfferById);
router.post('/job_offers', jobOfferController.createJobOffer);
router.put('/job_offers/:id', jobOfferController.updateJobOffer);
router.delete('/job_offers/:id', jobOfferController.deleteJobOffer);

module.exports = router;