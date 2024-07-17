import { configDotenv } from 'dotenv';
configDotenv();
import expressAsyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";


export const register=expressAsyncHandler(async(req,res)=>{
    const {username,email,phone,password}=req.body;
    if(!username||!email||!phone||!password)
    {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable)
    {
        res.status(400);
        throw new Error("User already exits");
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const newuser=await User.create(
        {
            username,
            email,
            phone,
            password: hashedPassword,
        }
    );
    if (newuser) {
        res.json({_id:newuser.id,email:newuser.email});
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    
    
})

export const login=expressAsyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password)
    {
        res.status(400);
        throw new Error("All fields are mandotory");

    }
    const user=await User.findOne({email});
    if(!user)
    {
        res.status(400);
        throw new Error("User doesnot exist");
    }
    const accessToken=jwt.sign({user:{
       username: user.username,
       email:user.email,
       id:user.id,
    }},process.env.ACCESS_TOKEN_SECERT,{expiresIn:"10m"})

    if(await bcrypt.compare(password,user.password))
    {
        res.status(200).json({accessToken})
    }
    else{
        res.status(401)
        throw new Error("Email or password is not valid");
    }
})

export const current=expressAsyncHandler(async(req,res)=>{
    res.json(req.user);
    
})