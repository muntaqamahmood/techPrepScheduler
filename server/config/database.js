import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(process.env);
    const conn = await mongoose.connect(process.env, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB database connected");
  } catch (err) {
    console.error(`Error connecting db: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
