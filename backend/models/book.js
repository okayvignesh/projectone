const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: String,
    userId: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    author: String,
    desc: String,
    year: Number,
    bookId: {
        type: String,
        unique: true
    },
})


module.exports = mongoose.model('Books', bookSchema)