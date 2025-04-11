const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    console.log(process.env.MONGO_URI)
  try {

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // timeout after 5s if not reachable
      family: 4
    });
    
    console.log("MongoDB Connected...");
  }catch (err) {
    console.error("MongoDB connection error:", err);
    console.error("Cause:", err.cause);
    process.exit(1);
  }
  
};

module.exports = connectDB;
