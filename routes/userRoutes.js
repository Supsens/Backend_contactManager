import express from 'express'
import { login, register,current } from '../controler/userControler.js';
import { ValidateToken } from '../middleware/Validatetokenhandler.js';


export const userRouter=express.Router();

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/current",ValidateToken,current)