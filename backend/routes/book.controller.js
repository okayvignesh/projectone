const express = require('express')
const dotenv = require('dotenv')
const router = express.Router()
const book = require('../models/book');
dotenv.config();


async function GenerateBook() {
    let count = 0;

    while (true) {
        const bookid = 'BK' + count;
        const Id = await book.findOne({ bookid });

        if (!Id) {
            return bookid;
        }
        count++;
    }
}



router.post('/add-book', async (req, res) => {
    try {
        let success = false;
        const bookId = await GenerateBook();
        console.log(bookId)


        const books = new book({
            title: req.body.title,
            category: req.body.category,
            desc: req.body.desc,
            year: req.body.year,
            bookId: bookId
        })

        const savedBook = await books.save();
        res.status(200).json({ success: true, books })
    } catch (error) {
        res.status(500).json(error)
    }
})





module.exports = router