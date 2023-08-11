const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: {
        type: String,
        unique: true
    },
    password: String,
    token: String,
})

const User = mongoose.model('User', userSchema);

module.exports = User;