import mongoose, { connect } from "mongoose";

export const conncetDb=async()=>{
    try {
        const resposnse= await mongoose.connect("mongodb+srv://Supsen:ZvjEceYuzDoBLrVM@test.qse22ua.mongodb.net/Myconacts")
        if(!resposnse)
        {
            throw new err("Cannot conncet");
            
        }
        else{
            
            console.log("Connection to data base succesfull");
        }
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

