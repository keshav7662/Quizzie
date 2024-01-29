const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    optionType: {
        type: String,
        enum: ['Text', 'Image URL', 'Text & Image URL'],
        required: true
    },
    option: {
        type: [{}],
        required: true
    },
    answer: {
        type: String
    },
    timer: {
        type: String,
        enum: ['OFF', '5 Sec', '10 Sec'],
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Question', questionSchema)