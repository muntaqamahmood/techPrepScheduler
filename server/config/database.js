import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://techprepcheduler:pWISEOWzeHdm8LqE@techprepscheduler.45cyy9p.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB database connected");
  } catch (err) {
    console.error(`Error connecting db: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
