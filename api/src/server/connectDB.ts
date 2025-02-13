import mongoose from "mongoose";

const connectDB = async (DB_URI: string) => {
  try {
    await mongoose.connect(DB_URI);
    console.info(`DB connection Successfu!`);
  } catch (error) {
    console.error("DB Connection Error Occured");
  }
};

export default connectDB;
