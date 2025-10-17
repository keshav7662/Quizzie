const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
  quizName: {
    type: String,
    required: true,
    trim: true
  },
  quizType: {
    type: String,
    enum: ['poll', 'qna'],
    required: true
  },
  impressions: {
    type: Number,
    default: 0
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuizieUsers',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Quiz', quizSchema);