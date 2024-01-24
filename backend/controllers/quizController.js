const Quiz = require('../models/quizSchema')
const Question = require('../models/questionSchema')

const { handleErrorResponse } = require('../utils/handleErrorResponse')

const checkQuestionLimit = (questions) => {
    return questions.length >= 5;
};

const createQuiz = async (req, res) => {
    try {
        const { quizName, quizType } = req.body;

        if (!quizName || !quizType) {
            return handleErrorResponse(res, 400, 'All fields mandatory!');
        }

        await Quiz.create({ quizName, quizType });
        return res.json({
            message: 'Quiz created, add questions!',
        });
    } catch (error) {
        console.error(error);
        return handleErrorResponse(res, 500, 'Internal server error');
    }
};

const createQuestion = async (req, res) => {
    try {
        const { title, option, optionType, answer } = req.body;
        const { id } = req.params;

        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return handleErrorResponse(res, 400, 'first create a quiz then add qun!')
        }

        if (!title || !option) {
            return handleErrorResponse(res, 400, 'Title and option are mandatory!');
        }
        if (option.length < 2 || option.length > 4) {
            return handleErrorResponse(res, 400, 'Options should be between 2 and 4!')
        }
        let newQuestion;
        if (quiz.quizType == 'Q&A') {
            if (!answer) {
                return handleErrorResponse(res, 400, 'Answer is mandatory for Q&A type quiz!');
            }
            newQuestion = await Question.create({ title, option, answer, optionType });
        } else {
            newQuestion = await Question.create({ title, option, optionType });
        }

        if (checkQuestionLimit(quiz.questions)) {
            return handleErrorResponse(res, 401, 'Max question limit reached');
        }

        quiz.questions.push(newQuestion);
        quiz.questionCount++;
        await quiz.save();

        return res.json({
            message: 'Question created!',
            newQuestion,
        });
    } catch (error) {
        console.error(error);
        return handleErrorResponse(res, 500, 'Internal server error');
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

module.exports = { createQuestion, createQuiz };
