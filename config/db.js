

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // await mongoose.connect(process.env.DATABASE_URI);
        const conn = await mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });


        console.log(`Connected to database: ${conn.connections[0].name}`);
    }
    catch (err){
        console.log("MongoDB connection failed. Exiting now...")
        process.exit();
    }
}
module.exports = connectDB;
