const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        unique: true,
    },
    categoryId: String,
    bookId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books'
    }]
})


module.exports = mongoose.model('Category', categorySchema)
