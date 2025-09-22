import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

    console.log("MongoDB Connected 🚀");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
};

export default connectDb;
