import mongoose from "mongoose"
import dotenv from "dotenv"

// Load environment variables from .env file
dotenv.config();



 

  const connectMongoDB= async()=>{
    
    try{ 
      // MongoDB connection URI from environment variables
const mongodbURI = process.env.NEXT_PUBLIC_MONGODB_URI;

if (mongodbURI) {
  // Connect to MongoDB
  await mongoose.connect(mongodbURI);
  console.log("conected to mongodb");
   
} else {
  console.error('MongoDB URI is not defined. Please check your environment variables.');
}


}catch(error){
    console.log(error)
}
  };


  export default connectMongoDB;

 