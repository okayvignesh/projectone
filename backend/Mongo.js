const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const URI = process.env.MONGO_URI;
mongoose.set('strictQuery', false);

const connectDb = async () => {
    mongoose
        .connect(URI)
        .then(() => {
            console.log("Successfully Connected to Database ✅");
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = connectDb;