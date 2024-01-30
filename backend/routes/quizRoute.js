const express = require('express');
const { createQuestion, createQuiz, getAllQuizzes, deleteQuiz, getQuizById } = require('../controllers/quizController');
const authenticatedUser = require('../middlewares/authentication')

const router = express.Router();

router.post('/create-quiz', authenticatedUser, createQuiz)
router.post('/add-question/:id?', authenticatedUser, createQuestion)
router.get('/all-quiz', authenticatedUser, getAllQuizzes)
router.delete('/delete-quiz/:id', authenticatedUser, deleteQuiz)
router.get('/quiz-by-id/:id', authenticatedUser, getQuizById)

module.exports = router;