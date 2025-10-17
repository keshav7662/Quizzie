const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const { mapQuestionsForDb } = require('../utils/mapQuestionForDb');
const { validateQuizPayload } = require('../utils/validateQuiz');
const ApiError = require('../utils/ApiError');


const createQuiz = async (req, res, next) => {
  try {
    const { quizName, quizType, questions } = req.body;

    const userId = req.user?._id;

    const error = validateQuizPayload({ quizName, quizType, questions });
    if (error) {
      throw new ApiError(400, error);
    }

    const mappedQuestions = mapQuestionsForDb(questions);

    // Create questions in DB
    const questionIds = [];
    for (const q of mappedQuestions) {
      const questionDoc = await Question.create(q);
      questionIds.push(questionDoc._id);
    }

    // Create quiz
    const quizDoc = await Quiz.create({
      quizName,
      quizType,
      questions: questionIds,
      userId
    });

    res.status(201).json({ message: 'Quiz created successfully', quizId: quizDoc._id });
  } catch (err) {
    next(err)
  }
};

const getAllQuizzes = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      throw new ApiError(401, 'Unauthorized access. Please log in again.');
    }

    const quizzes = await Quiz.find({ userId }).populate('questions')

    if (!quizzes || quizzes.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No quizzes found. Create your first quiz to get started!',
        quizzes: [],
      });
    }

    res.status(201).json({ success: true, message: 'Quiz fetched successfully!', quizzes })
  } catch (error) {
    console.log(error);
    next(error);
  }
}

const deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      throw new ApiError(404, 'Quiz not found!');
    }
    //deleting related questions in the database
    await Question.deleteMany({ _id: { $in: quiz.questions } })

    //delete quiz
    await quiz.deleteOne();
    res.status(200).json({ success: true, message: 'Quiz deleted Successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = { createQuiz, getAllQuizzes, deleteQuiz };