import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";



export const GetUserDetails =async (token)=>{
    try{
        if(!token){
            throw new Error('User not logged in');
        }
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        const user= await userModel.findById(decoded.id).select("-password");
        return user;
    }
    catch(err){
        console.log(err);
    }
}