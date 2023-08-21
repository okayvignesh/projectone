const express = require('express')
const dotenv = require('dotenv');
const Category = require('../models/category');
const router = express.Router();
dotenv.config();


async function GenerateCategory() {
    let count = 0;

    while (true) {
        const categoryId = 'CAT' + count;
        const catId = await Category.findOne({ categoryId });

        if (!catId) {
            return categoryId;
        }
        count++;
    }

}


router.post('/add', async (req, res) => {
    try {
        let success = false;
        const categoryId = await GenerateCategory();

        const category = new Category({
            category: req.body.category,
            categoryId: categoryId
        })

        const savedCategory = await category.save()
        res.status(200).json({ success: true, message: 'Category has been created!', category })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


router.get('/get-all', async (req, res) => {
    try {
        let success = false;
        const categories = await Category.find()
        if (categories) {
            res.status(200).json({ success: true, categories })
        } else {
            res.status(404).json({ success: false, message: "Not found" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


module.exports = router