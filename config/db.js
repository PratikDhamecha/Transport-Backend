

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
    }
    catch (err){
        console.log("MongoDB connection failed. Exiting now...")
        process.exit();
    }
}
module.exports = connectDB;
