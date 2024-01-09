import mongoose from "mongoose";
// import { env } from "process";

  export const connectDB = async ()=>{
    console.log(process.env.URI)
    if(process.env.URI!=undefined){
      await mongoose.connect(process.env.URI)
      mongoose.connection.on('open',()=>{
        console.log("connected")
      })
    }
    else{
        console.log("not connected")
    }
  }
