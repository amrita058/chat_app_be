import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
fullName:{type:String},
userName:{type:String},
email:{type:String},
password:{type:String}
},{
    timestamps:true,
    versionKey:false
})

export default mongoose.model("User",userSchema)