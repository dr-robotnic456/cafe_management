import mongoose from "mongoose";

const uri = process.env.MONGO_URI;

if(!uri){
    throw new Error(
        "Please define the env"
    )
}

const dbconn = async () => { 
  try {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("Connected Successfully");
  } catch (error) {
    console.log("Error connecting to database:", error.message);
  }
};

export default dbconn;