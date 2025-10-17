const express = require('express');
const { createQuiz, getAllQuizzes, deleteQuiz } = require('../controllers/QuizzController')
const authenticatedUser = require('../middlewares/authentication')

const router = express.Router();

router.post('/', authenticatedUser, createQuiz);
router.get('/', authenticatedUser, getAllQuizzes);
// router.get('/:id', authenticatedUser, getQuizById);       
// router.put('/:id', authenticatedUser, updateQuiz);       
router.delete('/:id', authenticatedUser, deleteQuiz);

module.exports = router;