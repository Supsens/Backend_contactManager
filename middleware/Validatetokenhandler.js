import expressAsyncHandler from "express-async-handler";
import  jwt, { decode }  from "jsonwebtoken";
export const ValidateToken=expressAsyncHandler(
    async(req,res,next)=>{
        let token;
        let authheader=req.headers.Authorization||req.headers.authorization;
        if(authheader && authheader.startsWith("Bearer")){
            token=authheader.split(" ")[1];
            jwt.verify(token,process.env.ACCESS_TOKEN_SECERT,(err,decoded)=>{
                if(err)
                {
                    res.status(401);
                    throw new Error("User is not authorized");
                }
                req.user=decoded.user;
                next();
            })
        }
        if(!token)
        {
            res.status(401);
            throw new Error ("User is not authorized or token is missing ");

        }
    }
)