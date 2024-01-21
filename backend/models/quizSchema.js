const mongoose = require('mongoose')

const quizSchema = mongoose.Schema({
    quizName: {
        type: String,
        required: true
    },
    quizType: {
        type: String,
        enum: ['poll', 'Q&A'],
        required: true
    },
    questionCount: {
        type: Number,
        default: 0
    },
    impressions: {
        type: Number,
        default: 0
    }, 
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }] //this will contain id of all the qun

})

module.exports = mongoose.model('Quiz', quizSchema);