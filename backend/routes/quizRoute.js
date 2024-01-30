const express = require('express');
const { createQuestion, createQuiz, getAllQuizzes, deleteQuiz } = require('../controllers/quizController');
const authenticatedUser = require('../middlewares/authentication')

const router = express.Router();

router.post('/create-quiz', authenticatedUser, createQuiz)
router.post('/add-question/:id?', authenticatedUser, createQuestion)
router.get('/get-quiz/:quizId?', authenticatedUser, getAllQuizzes)
router.delete('/delete-quiz/:id', authenticatedUser, deleteQuiz)

module.exports = router;