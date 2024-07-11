import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect('mongodb+srv://Anshuman27:Behera20@cluster0.pnceyfy.mongodb.net/AIR-MEAL').then(()=>console.log("DB Connected"));
   
}
