import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please add the user name"],

    },
    email:{
        type:String,
        required:[true,"Please add the user email adress"],
        unique:[true,"Email address already taken"],
    },
    phone:{
        type:String,
        required:[true,"Please add the user phone number"],
    },
    password:{
        type:String,
        required:[true,"Please add the user password"],
    }
},{timestamps:true});

export const User=mongoose.model("User",userSchema)