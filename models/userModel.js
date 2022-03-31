const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'please enter your username']
    },
    password: {
        type: String,
        required: [true, 'please enter your password']
    }
})

module.exports = mongoose.model('User', userSchema)