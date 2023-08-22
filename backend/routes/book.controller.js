const express = require('express')
const dotenv = require('dotenv')
const router = express.Router()
const Book = require('../models/book');
dotenv.config();


async function GenerateBook() {
    let count = 0;

    while (true) {
        const bookid = 'BK' + count;
        const existingId = await Book.findOne({ bookId: bookid });

        if (!existingId) {
            return bookid;
        }
        count++;
    }
}



router.post('/add-book/:id', async (req, res) => {
    try {
        let success = false;
        const userId = req.params.id
        const bookId = await GenerateBook();


        const books = new Book({
            title: req.body.title,
            category: req.body.category,
            desc: req.body.desc,
            year: req.body.year,
            author: req.body.author,
            bookId: bookId,
            userId: userId
        })

        const savedBook = await books.save();
        res.status(200).json({ success: true, books })
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/get-all/:id', async (req, res) => {
    try {
        let success = false;
        const userId = req.params.id
        const books = await Book.find({ userId: userId })
        if (!books || books.length == 0) {
            res.status(404).json({ success: false, message: "Books not found" })
        } else {
            res.status(200).json({ success: true, books })
        }
    } catch (error) {
        res.status(500).json(error)
    }
})





module.exports = router