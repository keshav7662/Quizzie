const express = require('express');
const { createQuestion, createQuiz, getAllQuizzes, deleteQuiz, getQuizById, updateQuizResults } = require('../controllers/quizController');
const authenticatedUser = require('../middlewares/authentication')

const router = express.Router();

router.post('/create-quiz', authenticatedUser, createQuiz)
router.post('/add-question/:id?', authenticatedUser, createQuestion)
router.get('/all-quiz', authenticatedUser, getAllQuizzes)
router.delete('/delete-quiz/:id', authenticatedUser, deleteQuiz)
router.get('/quiz-by-id/:id', getQuizById)
router.put('/update-quiz-result/:quizId', updateQuizResults);

module.exports = router;