const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    optionType: {
        type:String,
        enum: ['Text', 'Image URL', 'Text & Image URL'],
        required:true
    },
    option: {
        type: [String],
        required:true
    },
    answer: {
        type: String
    }
})

module.exports = mongoose.model('Question', questionSchema)