const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    author: String,
    authorId: String,
    bookId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books'
    }]
})


module.exports = mongoose.model('Author', authorSchema)
