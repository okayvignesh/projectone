
const express = require('express')
const dotenv = require('dotenv');
const User = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')

const router = express.Router();
dotenv.config();


router.get('/name', async (req, res) => {
    res.send('This is a router path Name 😩')
})


router.get('/', async (req, res) => {
    try {
        const users = await User.find({}).select('username userId');
        return res.status(200).json({ success: true, users })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
})


router.get('/:id', async (req, res) => {
    try {
        const users = await User.findOne({ userId: req.params.id }).select('firstname lastname username email phone');
        return res.status(200).json({ success: true, users })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
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

        const userId = uuid.v4();

        const NewUser = new User({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: hashedPassword,
            userId: userId
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

        const userId = user.userId
        const data = {
            user: {
                id: user.id
            }
        }
        const Token = jwt.sign(data, process.env.SECRET_KEY);
        res.status(200).json({ success: true, message: 'Login Successful', Token, userId });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});



router.patch('/update/:id', async (req, res) => {
    try {
        const newFields = req.body;
        const id = req.params.id

        const existingUser = await User.findOne({ userId: id })

        if (!existingUser) {
            return res.status(404).json({ error: 'User Does Not Exist', })
        }

        const updatedUser = await User.findOneAndUpdate(
            { userId: id },
            { $set: newFields },
            { returnOriginal: false }
        )
        res.status(200).json('Successfully updated user')
    } catch (error) {
        res.status(500).json(error.message)
    }
})








module.exports = router