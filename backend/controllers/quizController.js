const Quiz = require('../models/quizSchema')
const Question = require('../models/questionSchema')
const { handleErrorResponse } = require('../utils/handleErrorResponse')
const { validateQuestions } = require('../utils/validateQuestion')

const createQuiz = async (req, res) => {
    try {
        const { quizName, quizType } = req.body;
        const userId = req.user.userId

        if (!quizName || !quizType) {
            return handleErrorResponse(res, 400, 'All fields mandatory!');
        }

        const newQuiz = await Quiz.create({ quizName, quizType, userId });
        return res.json({
            message: 'Create your quiz now!',
            quizId: newQuiz._id,
            quizType:quizType
        });
    } catch (error) {
        console.error(error);
        return handleErrorResponse(res, 500, 'Internal server error');
    }
};

const createQuestion = async (req, res) => {
    try {
        const questionsData = req.body.questions;
        const { id } = req.params;

        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return handleErrorResponse(res, 400, 'First create a quiz, then add a question!');
        }
        const errors = validateQuestions(questionsData,quiz);
        if (Object.keys(errors).length === 0) {
            const createdQuestions = await Question.create(questionsData);
            quiz.questions.push(...createdQuestions);
            quiz.questionCount += createdQuestions.length;
            await quiz.save();

            return res.status(201).json({ message: 'Quiz Created Successfully!', newQuestion: createdQuestions });
        } else {
            return res.status(400).json({
                error: errors,
            });
        }
    } catch (error) {
        console.error(error);
        handleErrorResponse(res, 500, 'Internal Server error');
    }
};

const getAllQuizzes = async (req, res) => {
    try {
        const userId = req.user.userId;
        const allQuizzes = await Quiz.find({ userId }).populate('questions');
        if (allQuizzes) {
            return res.status(200).json({
                allQuizzes
            })
        }
    } catch (error) {
        handleErrorResponse(res, 500, 'Internal Server error');
    }
}

const deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const quiz = await Quiz.findById(id);

        if (!quiz) {
            return res.status(404).json({
                message: 'Quiz not found!',
            });
        }

        const response = await Quiz.findByIdAndDelete(id);

        if (response) {
            return res.status(200).json({
                message: 'Quiz Deleted successfully!',
            });
        }
    } catch (error) {
        return handleErrorResponse(res, 500, 'Internal server error!');
    }
};

module.exports = { createQuestion, createQuiz, getAllQuizzes, deleteQuiz };
