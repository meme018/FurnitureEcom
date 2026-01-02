const mongoose = require("mongoose");

const connectDatabase = async () => {
  console.log("DATABASE_URI:", process.env.DATABASE_URI); // TEMP debug

  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
