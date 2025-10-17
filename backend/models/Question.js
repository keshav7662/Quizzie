const mongoose = require('mongoose');

const optionSchema = mongoose.Schema({
    text: { type: String },
    image: { type: String },
    isCorrect: { type: Boolean, default: false }
}, { _id: false });

const questionSchema = mongoose.Schema({
    questionTitle: {
        type: String,
        required: true,
        trim: true
    },
    optionType: {
        type: String,
        enum: ['text', 'image', 'text-image'],
        required: true
    },
    options: {
        type: [optionSchema],
        validate: [arr => arr.length >= 2 && arr.length <= 4, 'Options must be between 2 and 4']
    },
    timer: {
        type: String,
        enum: ['off', '5sec', '10sec'],
        default: 'off'
    },
    attempts: {
        type: Number,
        default: 0
    },
    correctAnswers: {
        type: Number,
        default: 0
    },
    incorrectAnswers: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);