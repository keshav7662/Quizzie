const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    count: {
        type: Number,
        default: 0
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        reuired: true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('QuizieUsers', userSchema)