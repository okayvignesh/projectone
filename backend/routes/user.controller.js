const express = require('express')
const router = express.Router();
const dotenv = require('dotenv');
const User = require('../models/user');
dotenv.config();



router.get('/name', async (req, res) => {
    res.send('This is a router path Name 😩')
})

router.get('/', async (req, res) => {
    res.send('This is  Users 🦸')
})

router.post('/register', async (req, res) => {
    try {
        const { username } = req.body;
        let success = false
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Username already exists ❌' });
        }

        const NewUser = new User({
            username: req.body.data.username,
            firstname: req.body.data.firstname,
            lastname: req.body.data.lastname,
            password: req.body.data.password
        })

        const savedUser = await NewUser.save();
        res.status(200).json({ success: true, message: 'User Created Successfully ✅' });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})



module.exports = router