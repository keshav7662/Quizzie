const express = require('express');
const { createQuestion, createQuiz } = require('../controllers/quizController');
const authenticatedUser = require('../middlewares/authentication')
const router = express.Router();

router.post('/create-quiz', authenticatedUser,createQuiz)
router.post('/add-question/:id', authenticatedUser,createQuestion)

module.exports = router;