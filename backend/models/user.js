const mongoose = require('mongoose')

const socialMediaSchema = new mongoose.Schema({
    facebook: String,
    x: String,
    instagram: String,
    linkedin: String,
});

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: {
        type: String,
        unique: true
    },
    password: String,
    token: String,
    userId: {
        type: String,
        unique: true
    },
    email: String,
    phone: Number,
    social: socialMediaSchema

})

const User = mongoose.model('User', userSchema);

module.exports = User;