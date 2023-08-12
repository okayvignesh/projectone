const express = require('express')
const router = express.Router();
const dotenv = require('dotenv');
const User = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

dotenv.config();



router.get('/name', async (req, res) => {
    res.send('This is a router path Name 😩')
})

router.get('/', async (req, res) => {
    res.send('This is  Users 🦸')
})



router.post('/register', async (req, res) => {
    try {
        let success = false
        const existingUser = await User.findOne({ username: req.body.username });

        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Username already exists ❌' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const NewUser = new User({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: hashedPassword
        })

        const savedUser = await NewUser.save();
        res.status(200).json({ success: true, message: 'User Created Successfully ✅' });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})



router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).send("User does not Exist!");
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send("Incorrect Password!");
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const Token = jwt.sign(data, process.env.SECRET_KEY);
        res.status(200).json({ success: true, message: 'Login Successful', Token });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});




module.exports = router