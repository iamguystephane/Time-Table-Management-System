import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURL);
    console.log('Connection to database successful');
  } catch (error) {
    console.log('Error connecting to the database');
  }
};

export default connectMongoDB;