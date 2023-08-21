const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDb = require('./Mongo.js')
const cors = require('cors')

dotenv.config()
const app = express();
const PORT = process.env.PORT || 8000
app.use(cors({ origin: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDb();



app.use('/users', require('./routes/user.controller.js'))
app.use('/category', require('./routes/category.controller.js'))
app.use('/book', require('./routes/book.controller.js'))


app.get('/', async (req, res) => {
    res.send('Welcome to Backend, Vignesh 👋')
})



app.listen(PORT, () => console.log(`Express is running on port: ${PORT} 🏃`))
