const mongoose = require('mongoose');
const url= "mongodb+srv://akshi_tripathi:edX32AfB2olzUSSs@cluster0.4i0xhor.mongodb.net/BakeWave?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url, {
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); 
    }
};

module.exports = connectDB;
